import {styleOptions} from '../configs/styleOptions.config';
import FullBundleStyleOptions from "botframework-webchat/lib/types/FullBundleStyleOptions";
import {ObjectSanitize} from "../utils/object-sanitize.util";
import {ConfigMiddlewareAbstract} from "../abstracts/config-middleware.abstract";


export class StyleOptionsMiddleware extends ConfigMiddlewareAbstract{
    readonly #BaseStyleOptions = {};
    #FrontEndStyleOptions: {[option: string]: any} = {}
    #FrontEndStyleOptionsLock: {[option: string]: any} = {}

    get StyleOptions() {
        return this.#FrontEndStyleOptions;
    }

    get LockedStyleOptions(): FullBundleStyleOptions {
        let StyleOptions = {};
        Object.assign(StyleOptions, this.#BaseStyleOptions, this.#FrontEndStyleOptionsLock);

        return ObjectSanitize(StyleOptions) as FullBundleStyleOptions;
    }

    get BaseStyleOptions(){
        return {...this.#BaseStyleOptions};
    }

    constructor() {
        super();
        this.#BaseStyleOptions = styleOptions;
        console.log('StyleOptionsMiddleware -> Init Done!');
    }

    configLockLogic(): void{
        this.#FrontEndStyleOptionsLock = {...this.#FrontEndStyleOptions};
    }

    setStyleOption(option: string, value: any): void{
        this.#FrontEndStyleOptions[option] = value;
    }

    loadStyleOptions(styleOptions: {[p: string]: any}, replace: boolean = false): void{
        if (replace){
            this.#FrontEndStyleOptions = styleOptions;
        }
        else{
            let styleOptionsFinal = {};
            Object.assign(styleOptionsFinal, this.#FrontEndStyleOptions, styleOptions);
            this.#FrontEndStyleOptions = styleOptionsFinal;
        }

    }
}

