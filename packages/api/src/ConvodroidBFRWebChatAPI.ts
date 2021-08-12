import {v4 as uuidV4} from "uuid";
import {newInstance} from "@convodroid/bfrwebchat-core";
import {BotUser} from "@convodroid/bfrwebchat-core/dist/lib/types"

import {AnonymousUser, BotConfig, RebootTypes, RootElementConfig, TokenEndpointConfig} from "./types/api.types";
import {ConfigsGateway} from "./gateway/configs.gateway";
import {TokenStoreUtil} from "./utils/token-store.util";
import {DirectlineMiddleware, StoreMiddleware} from "@convodroid/bfrwebchat-core/dist/lib/app/middlewares";

/*
    this can be used to bootstrap the script and run the injection code and bot bootup.
    (() => {
        let script = document.createElement('script');
        script.async = true;
        script.onload = () => console.log("script loaded!", ConvodroidBFRWebChatCore);
        script.src = "https://emplayazstorage.blob.core.windows.net/emplaywebchat-test/react/convodroid.bfrwebchat-core.min.js";
        document.head.appendChild(script)
        }
     )();

 */

export class ConvodroidBFRWebChatAPI{
    #ID = uuidV4();
    readonly #BotConfig: BotConfig;
    #CORE = newInstance();
    #ConfigsGateway = new ConfigsGateway(this.#CORE);
    readonly #TokenStore: TokenStoreUtil;
    #RootConfig: RootElementConfig = {
        Id: undefined,
        Element: undefined
    }


    get RootConfig(): RootElementConfig {
        return {...this.#RootConfig};
    }

    set RootConfig(container){
        if (container.Element){
            if (!container.Element.id){
                container.Element.id = 'convodroid__bfrwebchat__root-'+this.#ID;
            }
            this.#RootConfig.Id = container.Element.id;
            this.#RootConfig.Element = container.Element;
        }else if (container.Id){
            this.#RootConfig.Id = container.Id;
            this.#RootConfig.Element = document.getElementById(container.Id) || undefined;

        }
    }


    get Configs(): ConfigsGateway{
        return this.#ConfigsGateway;
    }

    get TokenStore(): TokenStoreUtil{
        return  this.#TokenStore;
    }

    #Middlewares= {
        context: this,
        get StoreMWR(){
            return this.context.#CORE.Middlewares.StoreMWR;
        },
        get DirectlineMWR() {
          return this.context.#CORE.Middlewares.DirectlineMWR;
        }
    }

    get Middlewares(): {context: ConvodroidBFRWebChatAPI, readonly StoreMWR: StoreMiddleware, readonly DirectlineMWR: DirectlineMiddleware}{
        return this.#Middlewares;
    }

    get DirectlineMiddlware() {
        return this.#CORE.Middlewares.DirectlineMWR;
    }

    constructor(
        {
            botName,
            directlineSecret = '',
            tokenEndpointConfig = undefined,
        }: BotConfig,
        {
            name,
            email
        }: BotUser = {name: AnonymousUser.name, email: AnonymousUser.email},
        locale: string = AnonymousUser.locale,
    ) {

        const isTokenEndpointValid = ConvodroidBFRWebChatAPI.isValidTokenEndpointConfig(tokenEndpointConfig);
        if (!directlineSecret && !isTokenEndpointValid){
            throw new Error('ConvodroidBFRWebchatAPI -> BotConfig Invalid: Set either Directline or serverEndpoint in botconfig Argument!' +
                `\n directlineSecret: ${!!directlineSecret ? 'Configured!' : 'Not Configured!'}` +
                `\n tokenEndpointConfig: ${!!tokenEndpointConfig ? tokenEndpointConfig : 'Not Configured!'}` +
                '\n Note: in tokenEndpointConfig the api slugs are mandatory.'
            );
        }

        this.#BotConfig = {
            botName,
            directlineSecret,
            tokenEndpointConfig,
        };

        this.#CORE.Middlewares.UserMWR.loadUserConfig({
            name,
            email,
            locale
        });


        this.#TokenStore = new TokenStoreUtil(this.#BotConfig, this.#CORE.Middlewares.UserMWR.Config as BotUser);
        this.#TokenStore.initializeStore().then(() => {
            this.#CORE.Middlewares.DirectlineMWR.loadConfig(this.#TokenStore.ConversationObject, true);
        });
    }

    async bootup(): Promise<void>{
        this.#CORE.bootstrap(this.#RootConfig)
    }

    async shutdown(): Promise<void>{
        this.#CORE.shutdown();
    }

    async reboot(type: RebootTypes = RebootTypes.SIMPLE): Promise<void>{
        if (type !== RebootTypes.SOFT && type !== RebootTypes.HARD && type !== RebootTypes.SIMPLE){
            console.error('ConvodroidBFRWebChatAPI -> reboot type is not valid.')
            return;
        }
        await this.shutdown();
        if (type === RebootTypes.SOFT || type === RebootTypes.HARD){
            await this.#TokenStore.NewToken();
            this.#CORE.Middlewares.DirectlineMWR.loadConfig(this.#TokenStore.ConversationObject);

        }
        if (type === RebootTypes.HARD){
            console.warn('ConvodroidBFRWebChatAPI -> Hard reset is a bad Idea! One or more Configs will be reset to default.');
            this.#CORE.Middlewares.StyleOptionsMWR.loadStyleOptions({}, true);
            this.#CORE.Middlewares.AdaptiveCardsHostConfigMWR.loadHostConfig({}, true);
        }
        await this.bootup();
    }



    static isValidTokenEndpointConfig(tokenEndpointConfig: TokenEndpointConfig | undefined): boolean{
        return tokenEndpointConfig ? !!tokenEndpointConfig.get_token_slug && !!tokenEndpointConfig.reconnect_slug : false;
    }
}
