import {createDirectLine} from "botframework-webchat";
import {DirectLineOptions, IBotConnection} from "botframework-directlinejs";

import {DirectlineConfig} from "../configs/directline.config";
import {ObjectSanitize} from "../utils/object-sanitize.util";
import {ConfigMiddlewareAbstract} from "../abstracts/config-middleware.abstract";


export class DirectlineMiddleware extends ConfigMiddlewareAbstract{
    readonly #BaseConfig: DirectLineOptions = {};
    #FrontEndConfig: DirectLineOptions = {};
    #FrontEndConfigLock: DirectLineOptions = {};


    #Connection?: IBotConnection;

    get Connection(): IBotConnection {
        this.connect();
        return this.#Connection as IBotConnection;
    }

    get Config(): DirectLineOptions {
        return this.#FrontEndConfig;
    }

    get LockedConfig(): DirectLineOptions {
        let ConfigFinal = {};
        Object.assign(ConfigFinal, this.#BaseConfig, this.#FrontEndConfigLock)

        return ObjectSanitize(ConfigFinal);
    }

    get BaseConfig(): DirectLineOptions{
        return {...DirectlineConfig};
    }

    constructor() {
        super();
        this.#BaseConfig = DirectlineConfig;
        console.log('DirectlineMiddlewareBackEnd -> Init Done!');

    }

    connect(): void{
        if (!this.#Connection){
            this.#Connection = createDirectLine(this.LockedConfig as any);
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

    // setConfig(option: string, val: any): void{
    //     this.#FrontEndConfig[option] = val;
    // }

    loadConfig(DirectlineConfig: DirectLineOptions, replace: boolean = false): void{
        if (replace){
            this.#FrontEndConfig = DirectlineConfig;
        }else{

            let FinalConfig = {};
            Object.assign(FinalConfig, this.#FrontEndConfig, DirectlineConfig);
            this.#FrontEndConfig = FinalConfig;
        }
    }
    
}
