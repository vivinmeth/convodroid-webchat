export const DirectlineConfig = {
    secret: undefined, /* put your Direct Line secret here */
    token: undefined /* or put your Direct Line token here (supply secret OR token, not both) */,
    domain: undefined /* optional: if you are not using the default Direct Line endpoint, e.g. if you are using a region-specific endpoint, put its full URL here */,
    webSocket: undefined /* optional: false if you want to use polling GET to receive messages. Defaults to true (use WebSocket). */,
    pollingInterval: undefined /* optional: set polling interval in milliseconds. Defaults to 1000 */,
    timeout: undefined /* optional: a timeout in milliseconds for requests to the bot. Defaults to 20000 */,
    conversationStartProperties: { /* optional: properties to send to the bot on conversation start */
        locale: 'en-US'
    }
}

