import {styleOptions} from '../configs/styleOptions.config';
import FullBundleStyleOptions from "botframework-webchat/lib/types/FullBundleStyleOptions";
import {ObjectSanitize} from "../utils/object-sanitize.util";


export class StyleOptionsMiddleware{
    readonly #BaseStyleOptions = {};
    #FrontEndStyleOptions: {[option: string]: any} = {}
    #FrontEndStyleOptionsLock: {[option: string]: any} = {}

    #ConfigLocked = false;

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
        this.#BaseStyleOptions = styleOptions;
        console.log('StyleOptionsMiddleware -> Init Done!');
    }

    lockConfig(): boolean{
        if (!this.#ConfigLocked){
            this.#FrontEndStyleOptionsLock = {...this.#FrontEndStyleOptions};
            this.#ConfigLocked = true;
            console.log('StyleOptionsMiddleware -> Config Locked!');
        }
        else{
            console.warn('StyleOptionsMiddleware -> Config Already Locked!');
        }
        return true;

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

