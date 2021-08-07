import {AdaptiveCardsHostConfig} from "../configs/adaptiveCardsHostConfig.config";
import {ObjectSanitize} from "../utils/object-sanitize.util";



export class AdaptiveCardsHostConfigMiddleware{
    readonly #BaseHostConfig = {};
    #FrontEndHostConfig: {[p: string]: any} = {}
    #FrontEndHostConfigLock: {[p: string]: any} = {}

    #ConfigLocked = false;

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
        this.#BaseHostConfig = AdaptiveCardsHostConfig;
        console.log('AdaptiveCardsHostConfigMiddlewareBackEnd -> Init Done!');
    }

    lockConfig(): boolean{
        if (!this.#ConfigLocked){
            this.#FrontEndHostConfigLock = {...this.#FrontEndHostConfig};
            this.#ConfigLocked = true;
            console.log('StyleOptionsMiddleware -> Config Locked!');
        }
        else{
            console.warn('StyleOptionsMiddleware -> Config Already Locked!');
        }
        return true;

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
