import * as ReactDOM from "react-dom";
import React from "react";

import reportWebVitals from "../reportWebVitals";
import {CORE} from "../index";
import {StyleOptionsMiddleware} from "./middlewares";
import {DirectlineMiddleware} from "./middlewares";
import {AdaptiveCardsHostConfigMiddleware} from "./middlewares";
import {UserMiddleware} from "./middlewares";
import {StoreMiddleware} from "./middlewares";

export class ConvodroidBFRWebchatCore{
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

    constructor() {
        console.log();
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

        const root = container.Element || element;

        if (this.#Root !instanceof HTMLElement){
            return;
        }

        if (!this.#validateAndLockAllMiddlewares()){
            return;
        }

        this.#Root = root;

        this.#Middlewares.DirectlineMWR.connect();
        ReactDOM.render(
            <React.Fragment>
                <CORE.ConvodroidReactBFRWebchat
                    CORE={this}

                />
            </React.Fragment>,
        this.#Root as Element);

        // If you want to start measuring performance in your app, pass a function
        // to log results (for example: reportWebVitals(console.log))
        // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        reportWebVitals();

    }

    shutdown(): void{
        this.#Root && ReactDOM.unmountComponentAtNode(this.#Root);
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
