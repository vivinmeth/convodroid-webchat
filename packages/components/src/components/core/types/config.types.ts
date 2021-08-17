import {DirectLineOptions} from "botframework-directlinejs"
import FullBundleStyleOptions from "botframework-webchat/lib/types/FullBundleStyleOptions";

export interface BotUser {
    name: string;
    email: string;
}

export interface FullBotUser extends BotUser{
    id: string;
    locale?:string;
}

export interface CoreWebChatConfig {
    DirectlineConfig?: DirectLineOptions;
    UserConfig?: BotUser;
    StyleOptions?: FullBundleStyleOptions;
    AdaptiveCardsHostConfig?: {[p: string]: any};
    vanillaJSHost?: boolean;
}
