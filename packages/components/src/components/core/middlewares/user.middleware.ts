import {UserConfig} from "../configs/user.config";
import {v4 as uuidV4} from 'uuid';
import {ConfigMiddlewareAbstract} from "../abstracts/config-middleware.abstract";


export class UserMiddleware extends ConfigMiddlewareAbstract{
    #BaseConfig: typeof UserConfig;
    #FrontEndConfig: {[p: string]: any} = {};
    #FrontEndConfigLock: {[p: string]: any} = {};


    get Config() {
        return this.#FrontEndConfig;
    }

    get BaseConfig() {
        return {...this.#BaseConfig};
    }

    get LockedConfig() {
        const FinalConfig = {};
        Object.assign(FinalConfig, this.#BaseConfig, this.#FrontEndConfigLock);

        return FinalConfig;
    }

    constructor() {
        super();
        this.#BaseConfig = UserConfig;
        console.log('UserMiddleware -> Init Done!');
    }

    #configureUser = (): any => {
        const config = this.Config;

        if (config.email){
            config.id = config.email;
        }
        else{
            config.id = uuidV4();
            if (!config.name){
                config.name = `${this.BaseConfig.name} <${config.id}>`
            }
        }
        return config;
    }

    configLockLogic(): void{
        this.#FrontEndConfigLock = {...this.#configureUser()};
    }

    setUserConfig(option: string, value: any): void{
        this.#FrontEndConfig[option] = value;
    }

    loadUserConfig(Config: {[p: string]: any}, replace: boolean = false): void{
        if (replace){
            this.#FrontEndConfig = Config;
        }
        else{
            let ConfigFinal = {};
            Object.assign(ConfigFinal, this.#FrontEndConfig, Config);
            this.#FrontEndConfig = ConfigFinal;
        }

    }
}
