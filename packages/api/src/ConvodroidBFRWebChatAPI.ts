import {v4 as uuidV4} from "uuid";
import {newInstance} from "@convodroid/bfrwebchat-core";
import {BotUser, FullBotUser} from "@convodroid/bfrwebchat-core/dist/lib/types"

import {AnonymousUser, BotConfig, TokenEndpointConfig} from "./types/api.types";

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
    #CORE = newInstance();

    #BotConfig: BotConfig;
    #BotUser: FullBotUser;

    #USE_GET_TOKEN = false;

    // START: StyleOptions Middleware Glue Code //

    get BaseStyleOptions() {
        return this.#CORE.Middlewares.StyleOptionsMWR.StyleOptions;
    }

    get StyleOptions() {
        return this.#CORE.Middlewares.StyleOptionsMWR.StyleOptions;
    }

    get LockedStyleOptions() {
        return this.#CORE.Middlewares.StyleOptionsMWR.LockedStyleOptions;
    }

    set StyleOptions(StyleOptions) {
        this.#CORE.Middlewares.StyleOptionsMWR.loadStyleOptions(StyleOptions);
    }
    // END: StyleOptions Middleware Glue Code //

    constructor(
        {
            botName,
            directlineSecret = '',
            tokenEndpointConfig = undefined,
        }: BotConfig,
        {
            name = AnonymousUser.name,
            email = AnonymousUser.email
        }: BotUser = {},
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

        if (email === AnonymousUser.email){
            this.#BotUser.id = uuidV4();
        }
        else{
            this.#BotUser.id = email;
        }
        this.#BotUser.name = name === AnonymousUser.name ? (`${name} <${this.#BotUser.id}>`): name;
        this.#BotUser.email = email;
        this.#BotUser.locale = locale;

        this.#CORE.Middlewares.UserMWR.loadUserConfig(this.#BotUser, true);

        if (!tokenEndpointConfig){
            this.#CORE.Middlewares.DirectlineMWR.Config.secret = directlineSecret;
        }
    }

    // START: StyleOptions Middleware Glue Code //

    loadStyleOptions(StyleOptions, replace: boolean = false){
        this.#CORE.Middlewares.StyleOptionsMWR.loadStyleOptions(StyleOptions, replace);
    }
    // END: StyleOptions Middleware Glue Code //



    static isValidTokenEndpointConfig(tokenEndpointConfig: TokenEndpointConfig | undefined): boolean{
        return tokenEndpointConfig ? !!tokenEndpointConfig.get_token_slug && !!tokenEndpointConfig.reconnect_slug : false;
    }
}
