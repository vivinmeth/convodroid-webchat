import {AdaptiveCardsHostConfig} from "../configs/adaptiveCardsHostConfig.config";
import {ObjectSanitize} from "../utils/object-sanitize.util";
import {ConfigMiddlewareAbstract} from "../abstracts/config-middleware.abstract";



export class AdaptiveCardsHostConfigMiddleware extends ConfigMiddlewareAbstract{
    readonly #BaseHostConfig = {};
    #FrontEndHostConfig: {[p: string]: any} = {}
    #FrontEndHostConfigLock: {[p: string]: any} = {}


    get HostConfig() {
        return this.#FrontEndHostConfig;
    }

    get LockedHostConfig(): any {
        let HostConfig = {};
        Object.assign(HostConfig, this.#BaseHostConfig, this.#FrontEndHostConfigLock);

        return ObjectSanitize(HostConfig);
    }

    get BaseHostConfig(){
        return {...this.#BaseHostConfig};
    }

    constructor() {
        super();
        this.#BaseHostConfig = AdaptiveCardsHostConfig;
        console.log('AdaptiveCardsHostConfigMiddleware -> Init Done!');
    }

    configLockLogic(): void{
        this.#FrontEndHostConfigLock = {...this.#FrontEndHostConfig};
    }

    setHostConfig(option: string, value: any): void{
        this.#FrontEndHostConfig[option] = value;
    }

    loadHostConfig(HostConfig: {[p: string]: any}, replace: boolean = false): void{
        if (replace){
            this.#FrontEndHostConfig = HostConfig;
        }
        else{
            let HostConfigFinal = {};
            Object.assign(HostConfigFinal, this.#FrontEndHostConfig, HostConfig);
            this.#FrontEndHostConfig = HostConfigFinal;
        }

    }


}
