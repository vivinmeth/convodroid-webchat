import {BotUser} from "@convodroid/bfrwebchat-core/dist/lib/types"

import {BotConfig} from "../types/api.types";
import {ConversationObject, TokenStore} from "../types/token-store.types";
import {ConvodroidBFRWebChatAPI} from "../ConvodroidBFRWebChatAPI";

export class TokenStoreUtil{
    #StoreID = window.btoa(this.BotUser.email);
    #Store: TokenStore = {
        token: '',
        conversationId: '',
        expires_in: 3600,
        generatedAt: new Date(0), // old date object to make sure the TokenStore is always initialised during new Instance
        expiresOn: new Date(3400) // old date object to make sure the TokenStore is always initialised during new Instance
    };

    get ConversationId() {
        return this.#Store.conversationId;
    }

    get ConversationObject(): ConversationObject {
        return {
            eTag: this.#Store.eTag,
            referenceGrammarId: this.#Store.referenceGrammarId,
            token: this.#Store.token,
            conversationId: this.#Store.conversationId,
            streamURL: this.#Store.streamURL,
            expires_in: this.#Store.expires_in

        }
    }

    get ID() {
        return this.#StoreID;
    }

    #tokenURL = {
        context: this,
        generate: 'https://directline.botframework.com/v3/directline/tokens/generate',
        refresh: 'https://directline.botframework.com/v3/directline/tokens/refresh',
        get reconnect(): string{
            return `https://directline.botframework.com/v3/directline/conversations/${this.context.#Store.conversationId}?watermark=-`;
        },
        get serverGet(): string{
            return `${this.context.serverEndpoint}/${this.context.BotConfig.tokenEndpointConfig?.get_token_slug}?id=${this.context.BotUser.email}&name=${this.context.BotUser.name}`;
        },
        get serverReconnect(): string{
            return `${this.context.serverEndpoint}/${this.context.BotConfig.tokenEndpointConfig?.reconnect_slug}/${this.context.#Store.conversationId}?watermark=-`;
        }
    };
    get tokenURL(): any{
        return this.#tokenURL;
    }

    get serverEndpoint() {
        return this.BotConfig.tokenEndpointConfig?.serverEndpoint || window.location.origin;
    }

    constructor(private BotConfig: BotConfig, private BotUser: BotUser) {
        console.log();
    }

    async initializeStore(): Promise<void>{
        let createNewStore = false;
        if (
            !this.#Store.conversationId ||
            !this.#Store.token
        ){
            const storageTokenStore = TokenStoreUtil.getStore(this.BotConfig.botName, this.ID);
            if (storageTokenStore){
                this.#Store = TokenStoreUtil.StorageTokenStoreToTokenStore(storageTokenStore);
            } else{
                createNewStore = true;
            }
        }
        await this.#loadToken(createNewStore);
    }

    async NewToken(): Promise<void>{
        await this.#loadToken(true);
    }

    async #loadToken(newToken = false): Promise<void>{
        let ConversationObj: ConversationObject;
        if (newToken || this.#Store.expiresOn.getTime() < Date.now()){
            ConversationObj = await this.#generateToken();
        }
        else{
            const ReconnectConvObj = await this.#generateReconnectToken();
            ConversationObj = ReconnectConvObj || await this.#generateToken();
        }
        this.#setToken(ConversationObj);

    }

    #setToken(ConversationObj: ConversationObject): void{
        const now = new Date(Date.now())
        this.#Store = {
            ...ConversationObj,
            generatedAt: now,
            expiresOn: new Date(now.getTime() + ((ConversationObj.expires_in  - 120) * 1000))
        };
        TokenStoreUtil.setStore(this.BotConfig.botName, this.ID, this.#Store);
    }

    #generateToken = async (): Promise<ConversationObject> => {
        console.log(`Generating the token for ${this.BotConfig.botName}`);
        let res;
        if (ConvodroidBFRWebChatAPI.isValidTokenEndpointConfig(this.BotConfig.tokenEndpointConfig)){
            console.log(`using the get token endpoint -> ${this.#tokenURL.serverGet}` );
            res = await fetch(this.#tokenURL.serverGet, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors',
            });
        }
        else{
            console.log(`using the token generate url -> ${this.#tokenURL.generate}` );
            res = await fetch(this.#tokenURL.generate, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    Authorization: 'Bearer ' + this.BotConfig.directlineSecret
                }
            });
        }

        return await res.json();
    }

    #generateReconnectToken = async (): Promise<ConversationObject | null> => {
        console.log('ConvodroidBFRWebChatAPI -> Generating Reconnect Token');
        let res;

        res = await fetch(this.#tokenURL.reconnect, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                Authorization: 'Bearer ' + this.#Store.token
            }
        });
        console.log('Res::', res);
        if (!(res.status >= 200 && res.status < 400)){
            console.error('ConvodroidBFRWebChatAPI -> Reconnect Token Generation Failed!', res);
            if (res.status === 403){
                res = await fetch(this.#tokenURL.serverReconnect, {
                    method: 'GET', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        Authorization: 'Bearer ' + this.#Store.token
                    }
                });
                if (res.status >= 200 && res.status < 400) {

                    return await res.json();
                }
                return null;
            }
            return null;
        }
        else{
           return await res.json()
        }


    }

    #refreshToken = async (): Promise<ConversationObject> => {
        console.log(`ConvodroidBFRWebChatAPI -> Refreshing the token for ${this.BotConfig.botName}`);
        const res = await fetch(this.#tokenURL.refresh, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                Authorization: 'Bearer ' + this.#Store.token
            },
            body: JSON.stringify({})
        });
        return await res.json();
    }


    static getStore(botName: string, StoreID: string): any{
        const storageTokenStore = localStorage.getItem(botName);
        let Store;
        if (storageTokenStore){
            Store = JSON.parse(storageTokenStore)[StoreID];
        }
        return Store;
    }

    static setStore(botName: string, StoreID: string, TokenStore: TokenStore): void{
        let storageTokenStore = JSON.parse(localStorage.getItem(botName) as string);
        if (storageTokenStore) {
            storageTokenStore[StoreID] = {...TokenStore};
        }
        else{
            storageTokenStore = {
                [StoreID]: {...TokenStore}
            }
        }
        localStorage.setItem(botName, JSON.stringify(storageTokenStore));
    }

    static StorageTokenStoreToTokenStore(storageTokenStore: any): TokenStore{
        storageTokenStore.generatedAt = new Date(storageTokenStore.generatedAt);
        storageTokenStore.expiresOn = new Date(storageTokenStore.expiresOn);
        return storageTokenStore;
    }

}
