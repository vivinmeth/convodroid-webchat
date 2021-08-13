export interface TokenStore extends ConversationObject{
    watermark?: string;
    generatedAt: Date;
    expiresOn: Date;
    is_fresh_token?: boolean;
}

export interface ConversationObject {
    eTag?: string;
    referenceGrammarId?: string;
    token: string;
    conversationId?: string;
    streamURL?: string;
    expires_in: number;
}
