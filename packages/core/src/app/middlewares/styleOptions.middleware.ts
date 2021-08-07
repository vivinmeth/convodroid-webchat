import styleOptions from '../configs/styleOptions.config';
import FullBundleStyleOptions from "botframework-webchat/lib/types/FullBundleStyleOptions";


export class StyleOptionsMiddlewareBackEnd{
    readonly #BaseStyleOptions = {};
    readonly #FrontEndStyleOptionsLocked = {}

    get StyleOptions(): FullBundleStyleOptions {
        let StyleOptions = {};
        Object.assign(StyleOptions, this.#BaseStyleOptions, this.#FrontEndStyleOptionsLocked);

        return StyleOptionsMiddlewareBackEnd.Sanitize(StyleOptions as FullBundleStyleOptions) as FullBundleStyleOptions;
    }

    constructor(private StyleOptionsMWRFrontEnd: StyleOptionsMiddlewareFrontEnd) {
        this.#BaseStyleOptions = styleOptions;
        this.#FrontEndStyleOptionsLocked = {...this.StyleOptionsMWRFrontEnd.StyleOptions};
        console.log('StyleOptionsMiddlewareBackEnd -> Init Done! StyleOptions Locked! StyleOptionsMiddlewareBackEnd:', this);
    }

    static Sanitize(styleOptions: FullBundleStyleOptions): any{
        // @ts-ignore
        Object.keys(styleOptions).forEach(key => styleOptions[key] === undefined ? delete styleOptions[key] : {});
        return styleOptions;
    }
}

export class StyleOptionsMiddlewareFrontEnd{
    #StyleOptions: {[p: string]: any} = {};

    get StyleOptions(){
        return this.#StyleOptions;
    }

    get BaseStyleOptions(){
        return {...styleOptions};
    }

    constructor() {
        console.log('StyleOptionsMiddlewareFrontEnd -> Init!');
    }

    setStyleOption(option: string, value: any): void{
        this.#StyleOptions[option] = value;
    }

    loadStyleOptions(styleOptions: {[p: string]: any}, replace: boolean = false): void{
        if (replace){
            this.#StyleOptions = styleOptions;
        }
        else{
            let styleOptionsFinal = {};
            Object.assign(styleOptionsFinal, this.#StyleOptions, styleOptions);
            this.#StyleOptions = styleOptionsFinal;
        }

    }
}
