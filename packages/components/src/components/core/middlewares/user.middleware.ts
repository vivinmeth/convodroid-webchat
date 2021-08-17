import {UserConfig} from "../configs/user.config";
import {v4 as uuidV4} from 'uuid';
import {ConfigMiddlewareAbstract} from "../abstracts/config-middleware.abstract";
import {BotUser, FullBotUser} from "../types";


export class UserMiddleware extends ConfigMiddlewareAbstract{
    #BaseConfig: BotUser;
    #FrontEndConfig: FullBotUser | {} = {};
    #FrontEndConfigLock: FullBotUser | {} = {};


    get Config(): FullBotUser {
        return this.#FrontEndConfig as FullBotUser;
    }

    get BaseConfig(): BotUser {
        return {...this.#BaseConfig};
    }

    get LockedConfig(): FullBotUser {
        const FinalConfig = {};
        Object.assign(FinalConfig, this.#BaseConfig, this.#FrontEndConfigLock);

        return FinalConfig as FullBotUser;
    }

    constructor() {
        super();
        this.#BaseConfig = UserConfig;
        console.log('UserMiddleware -> Init Done!');
    }

    #configureUser = (): FullBotUser => {
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

    // setUserConfig(option: string, value: any): void{
    //     this.#FrontEndConfig[option] = value;
    // }

    loadUserConfig(Config: BotUser, replace: boolean = false): void{
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
