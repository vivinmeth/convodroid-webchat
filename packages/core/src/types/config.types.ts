export interface BotUser {
    name: string;
    email: string;
}

export interface FullBotUser extends BotUser{
    id: string;
    locale?:string;
}
