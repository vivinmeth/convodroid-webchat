export interface TokenStore extends ConversationObject{
    watermark?: string;
    generatedAt: Date;
    expiresOn: Date;
}

export interface ConversationObject {
    eTag?: string;
    referenceGrammarId?: string;
    token: string;
    conversationId: string;
    streamURL?: string;
    expires_in: number;
}
