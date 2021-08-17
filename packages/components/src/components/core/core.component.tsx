import React from 'react';
import * as ReactDOM from "react-dom";
import ReactWebChat from "botframework-webchat";

import {StyleOptionsMiddleware} from "./middlewares";
import {DirectlineMiddleware} from "./middlewares";
import {AdaptiveCardsHostConfigMiddleware} from "./middlewares";
import {UserMiddleware} from "./middlewares";
import {StoreMiddleware} from "./middlewares";
import {CoreWebChatConfig} from "./types";

export class Core extends React.Component<CoreWebChatConfig, any>{
    #Root?: HTMLElement;

    #Middlewares = {
        AdaptiveCardsHostConfigMWR: new AdaptiveCardsHostConfigMiddleware(),
        StyleOptionsMWR: new StyleOptionsMiddleware(),
        DirectlineMWR: new DirectlineMiddleware(),
        UserMWR: new UserMiddleware(),
        StoreMWR: new StoreMiddleware()
    }

    #LockSecrets: {[k: string]: string | undefined} = {}

    get root(){
        return this.#Root;
    }

    get Middlewares(){
        return this.#Middlewares;
    }

    render() {
        return (
            <div id={'convodroid__bfrwebchat__core'} style={{width: "100%", height: "100%"}}>
                <ReactWebChat
                    userID={this.Middlewares.UserMWR.Config.id}
                    username={this.Middlewares.UserMWR.Config.name}
                    adaptiveCardsHostConfig={this.Middlewares.AdaptiveCardsHostConfigMWR.LockedHostConfig}
                    directLine={this.Middlewares.DirectlineMWR.Connection}
                    store={this.Middlewares.StoreMWR.Store}
                    styleOptions={this.Middlewares.StyleOptionsMWR.LockedStyleOptions}
                    locale={'en-US'}
                />
            </div>
        );
    }

    constructor(props: CoreWebChatConfig) {
        super(props);

        props.DirectlineConfig && this.Middlewares.DirectlineMWR.loadConfig(props.DirectlineConfig);
        props.UserConfig && this.Middlewares.UserMWR.loadUserConfig(props.UserConfig);
        props.AdaptiveCardsHostConfig && this.Middlewares.AdaptiveCardsHostConfigMWR.loadHostConfig(props.AdaptiveCardsHostConfig);
        props.StyleOptions && this.Middlewares.StyleOptionsMWR.loadStyleOptions(props.StyleOptions);

        if(!props.vanillaJSHost && !this.#validateAndLockAllMiddlewares()){
            this.#unlockAllMiddlewares();
            throw new Error('ConvodroidBFRWebchatCore -> One or more config is not valid!');
        }
    }


    componentWillUnmount() {
        this.#destroy();
    }

    bootstrap = (container: { Id?: string, Element?: HTMLElement}) => {
        let element;

        if (!container.Id && !container.Element){
            console.error('ConvodroidBFRWebchatCore -> bootstrap failed! Empty container config passed!');
            return;
        }
        else if (container.Id){
            element = document.getElementById(container.Id) || undefined
            if (!element){
                console.error("ConvodroidBFRWebchatCore -> bootstrap failed! Container ", container, "not defined!");
                return;
            }
        }

        const root = container.Element || element as HTMLElement;
        console.log('ConvodroidBFRWebchatCore -> ', root, container);
        if (!(root instanceof HTMLElement)){
            return;
        }
        console.log('ConvodroidBFRWebchatCore -> root is valid ');
        if (!this.#validateAndLockAllMiddlewares()){
            this.#unlockAllMiddlewares();
            return;
        }
        console.log('ConvodroidBFRWebchatCore -> Middlewars are locked');


        this.#Root = root;

        if (!this.#Root || !((this.#Root as any) instanceof HTMLElement)){
            return;
        }
        console.log('ConvodroidBFRWebchatCore -> #root is valid ');


        this.#Middlewares.DirectlineMWR.connect();
        ReactDOM.render(this.render(),
            this.#Root as Element);
    }

    shutdown(): void{
        this.#Root && ReactDOM.unmountComponentAtNode(this.#Root);
        this.#destroy();
    }

    #destroy = (): void => {
        this.#Middlewares.DirectlineMWR.disconnect();
        this.#unlockAllMiddlewares();
    }

    #validateAndLockAllMiddlewares = (): boolean => {
        console.warn('ConvodroidBFRWebchatCore -> Locking all middlewares!');
        const lockStatus: boolean[] = [];
        for (const mwr in this.#Middlewares){
            if (this.#Middlewares.hasOwnProperty(mwr)){
                // @ts-ignore
                const valid = this.#Middlewares[mwr].validate ? this.#Middlewares[mwr].validate() : true;
                let locked: [boolean, string | undefined] = [false, undefined];
                if (valid){
                    // @ts-ignore
                    locked = this.#Middlewares[mwr].lockConfig ? this.#Middlewares[mwr].lockConfig() : [true, undefined];
                    this.#LockSecrets[mwr] = locked[1];
                }
                lockStatus.push((valid && locked[0]));
            }
        }
        console.log('ConvodroidBFRWebchatCore -> lockStatus:', lockStatus);
        return !lockStatus.includes(false);
    }

    #unlockAllMiddlewares = () => {
        console.warn('ConvodroidBFRWebchatCore -> Unlocking all middlewares!');

        for (const mwr in this.#Middlewares){
            if (this.#Middlewares.hasOwnProperty(mwr)){
                // @ts-ignore
                this.#Middlewares[mwr].unlockConfig && this.#Middlewares[mwr].unlockConfig(this.#LockSecrets[mwr]);
            }
        }
    }
}
