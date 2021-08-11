export interface BotConfig {
    botName: string;
    directlineSecret?: string;
    tokenEndpointConfig?: TokenEndpointConfig;
    MAX_RECONNECT_ACTIVITIES?: number;
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
