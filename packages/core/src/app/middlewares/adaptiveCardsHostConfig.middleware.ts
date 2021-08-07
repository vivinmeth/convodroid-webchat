import adaptiveCardsHostConfig from "../configs/adaptiveCardsHostConfig.config";



export class AdaptiveCardsHostConfigMiddlewareBackEnd{
    readonly #BaseHostConfig = {};
    readonly #FrontEndHostConfigLocked = {}

    get HostConfig(): any {
        let HostConfig = {};
        Object.assign(HostConfig, this.#BaseHostConfig, this.#FrontEndHostConfigLocked);

        return AdaptiveCardsHostConfigMiddlewareBackEnd.Sanitize(HostConfig);
    }

    constructor(private AdaptiveCardsHostConfigMWRFrontEnd: AdaptiveCardsHostConfigMiddlewareFrontEnd) {
        this.#BaseHostConfig = adaptiveCardsHostConfig;
        this.#FrontEndHostConfigLocked = {...this.AdaptiveCardsHostConfigMWRFrontEnd.HostConfig};
        console.log('AdaptiveCardsHostConfigMiddlewareBackEnd -> Init Done! HostConfig Locked! AdaptiveCardsHostConfigMiddlewareBackEnd:', this);
    }

    static Sanitize(HostConfig: any): any{
        // @ts-ignore
        Object.keys(HostConfig).forEach(key => HostConfig[key] === undefined ? delete HostConfig[key] : {});
        return HostConfig;
    }
}

export class AdaptiveCardsHostConfigMiddlewareFrontEnd{
    #HostConfig: {[p: string]: any} = {};

    get HostConfig(){
        return this.#HostConfig;
    }

    get BaseHostConfig(){
        return {...adaptiveCardsHostConfig};
    }

    constructor() {
        console.log('AdaptiveCardsHostConfigMiddlewareFrontEnd -> Init!');
    }

    setHostConfig(option: string, value: any): void{
        this.#HostConfig[option] = value;
    }

    loadHostConfig(HostConfig: {[p: string]: any}, replace: boolean = false): void{
        if (replace){
            this.#HostConfig = HostConfig;
        }
        else{
            let HostConfigFinal = {};
            Object.assign(HostConfigFinal, this.#HostConfig, HostConfig);
            this.#HostConfig = HostConfigFinal;
        }

    }
}
