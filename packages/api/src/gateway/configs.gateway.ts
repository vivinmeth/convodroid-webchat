import {ConvodroidBFRWebchatCore} from "@convodroid/bfrwebchat-core/dist/lib/app/ConvodroidBFRWebchatCore";

export class ConfigsGateway{



    // START: StyleOptions Middleware Glue Code //

    get BaseStyleOptions(): any {
        return this.WebChatCORE.Middlewares.StyleOptionsMWR.BaseStyleOptions;
    }

    get StyleOptions(): any {
        return this.WebChatCORE.Middlewares.StyleOptionsMWR.StyleOptions;
    }

    get LockedStyleOptions(): any {
        return this.WebChatCORE.Middlewares.StyleOptionsMWR.LockedStyleOptions;
    }

    set StyleOptions(StyleOptions: any) {
        this.WebChatCORE.Middlewares.StyleOptionsMWR.loadStyleOptions(StyleOptions);
    }
    // END: StyleOptions Middleware Glue Code //

    // START: User Middleware Glue Code //
    get BaseUserConfig(): any{
        return this.WebChatCORE.Middlewares.UserMWR.BaseConfig;
    }

    get UserConfig(): any {
        return this.WebChatCORE.Middlewares.UserMWR.Config;
    }

    get LockedUserConfig(): any {
        return this.WebChatCORE.Middlewares.UserMWR.LockedConfig;
    }

    set UserConfig(UserConfig: any) {
        this.WebChatCORE.Middlewares.UserMWR.loadUserConfig(UserConfig);
    }
    // END: User Middleware Glue Code //
    
    constructor(private WebChatCORE: ConvodroidBFRWebchatCore) {
    }

    // START: StyleOptions Middleware Glue Code //

    loadStyleOptions(StyleOptions: any, replace = false): void{
        this.WebChatCORE.Middlewares.StyleOptionsMWR.loadStyleOptions(StyleOptions, replace);
    }
    // END: StyleOptions Middleware Glue Code //

    // START: User Middleware Glue Code //

    loadUserConfig(UserConfig: any, replace = false): void{
        this.WebChatCORE.Middlewares.UserMWR.loadUserConfig(UserConfig, replace);
    }

    // END: User Middleware Glue Code //
}
