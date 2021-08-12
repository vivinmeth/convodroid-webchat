export interface BotConfig {
    botName: string;
    directlineSecret?: string;
    tokenEndpointConfig?: TokenEndpointConfig;
    MAX_RECONNECT_ACTIVITIES?: number;
}

export interface RootElementConfig{
    Id?: string;
    Element?: HTMLElement;
}

export interface TokenEndpointConfig {
    get_token_slug: string;
    reconnect_slug: string;
    serverEndpoint?: string;
}

export enum AnonymousUser {
    name='Guest',
    email='anonymous@nodomain.tld',
    locale='en-US'
}

export enum RebootTypes {
    SIMPLE= 'simple',
    SOFT= 'soft',
    HARD= 'hard'
}

export interface BotAuth {
    token: string;
    conversationId: string;
    streamURL?: string;
    watermark?: string;
    generatedAt: Date;
    expiresOn: Date;
    expires_in: number;
}
