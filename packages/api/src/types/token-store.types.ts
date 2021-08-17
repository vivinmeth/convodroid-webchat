import {Conversation} from "botframework-directlinejs";

export interface TokenStore extends Conversation{
    watermark?: string;
    generatedAt: Date;
    expiresOn: Date;
    is_fresh_token?: boolean;
}
