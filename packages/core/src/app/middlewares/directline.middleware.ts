import {createDirectLine} from "botframework-webchat";

import {DirectlineConfig} from "../configs/directline.config";
import {ObjectSanitize} from "../utils/object-sanitize.util";
import {ConfigMiddlewareAbstract} from "../abstracts/config-middleware.abstract";


export class DirectlineMiddleware extends ConfigMiddlewareAbstract{
    readonly #BaseConfig = {};
    #FrontEndConfig: {[option: string]: any} = {};
    #FrontEndConfigLock: {[option: string]: any} = {};


    #Connection: any;

    get Connection() {
        this.connect();
        return this.#Connection;
    }

    get Config() {
        return this.#FrontEndConfig;
    }

    get LockedConfig() {
        let ConfigFinal = {};
        Object.assign(ConfigFinal, this.#BaseConfig, this.#FrontEndConfigLock)

        return ObjectSanitize(ConfigFinal);
    }

    get BaseConfig(){
        return {...DirectlineConfig};
    }

    constructor() {
        super();
        this.#BaseConfig = DirectlineConfig;
        console.log('DirectlineMiddlewareBackEnd -> Init Done!');

    }

    connect(): void{
        if (!this.#Connection){
            this.#Connection = createDirectLine(this.LockedConfig);
        }
    }

    disconnect(): void{
        this.#Connection = undefined;
    }

    validate(): boolean{
        const isValid = (!!this.#FrontEndConfig.secret || !!this.#FrontEndConfig.token) && !(!!this.#FrontEndConfig.secret && !!this.#FrontEndConfig.token);
        if (!isValid){
            console.error("DirectlineMiddleware -> Invalid Config.");
        }
        return isValid;
    }

    configLockLogic(): void{
        this.#FrontEndConfigLock = {...this.#FrontEndConfig};
    }

    setConfig(option: string, val: any): void{
        this.#FrontEndConfig[option] = val;
    }

    loadConfig(DirectlineConfig: {[p: string]: any}, replace: boolean = false): void{
        if (replace){
            this.#FrontEndConfig = DirectlineConfig;
        }else{

            let FinalConfig = {};
            Object.assign(FinalConfig, this.#FrontEndConfig, DirectlineConfig);
            this.#FrontEndConfig = FinalConfig;
        }
    }
    
}
