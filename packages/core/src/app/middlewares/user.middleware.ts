import {UserConfig} from "../configs/user.config";
import {v4 as uuidV4} from 'uuid';


export class UserMiddleware{
    #BaseConfig: typeof UserConfig;
    #FrontEndConfig: {[p: string]: any} = {};
    #FrontEndConfigLock: {[p: string]: any} = {};

    #ConfigLocked = false;

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

    lockConfig(): boolean{
        if (!this.#ConfigLocked){
            this.#FrontEndConfigLock = {...this.#configureUser()};
            this.#ConfigLocked = true;
            console.log('UserMiddleware -> Config Locked!');
        }
        else{
            console.warn('UserMiddleware -> Config Already Locked!');
        }
        return true;

    }

    setHostConfig(option: string, value: any): void{
        this.#FrontEndConfig[option] = value;
    }

    loadHostConfig(Config: {[p: string]: any}, replace: boolean = false): void{
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
