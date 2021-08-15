export enum StoreDirectlineEvents {
    DIRECT_LINE_CONNECT = "DIRECT_LINE/CONNECT",
    DIRECT_LINE_CONNECT_FULFILLED = "DIRECT_LINE/CONNECT_FULFILLED",
    DIRECT_LINE_CONNECT_FULFILLING = "DIRECT_LINE/CONNECT_FULFILLING",
    DIRECT_LINE_CONNECT_PENDING = "DIRECT_LINE/CONNECT_PENDING",
    DIRECT_LINE_CONNECT_REJECTED = "DIRECT_LINE/CONNECT_REJECTED",
    DIRECT_LINE_CONNECT_STILL_PENDING = "DIRECT_LINE/CONNECT_STILL_PENDING",
    // DIRECT_LINE_CONNECTION_STATUS_UPDATE: MSBFR's comment
    // TODO: [P3] We should obsolete this action in favor of DIRECT_LINE/UPDATE_CONNECTION_STATUS.
    //       But today, both actions behave differently, this one only dispatch after connected and not dispatched when disconnected.
    DIRECT_LINE_CONNECTION_STATUS_UPDATE = "DIRECT_LINE/CONNECTION_STATUS_UPDATE",
    DIRECT_LINE_DELETE_ACTIVITY = "DIRECT_LINE/DELETE_ACTIVITY",
    DIRECT_LINE_DISCONNECT = "DIRECT_LINE/DISCONNECT",
    DIRECT_LINE_DISCONNECT_PENDING = "DIRECT_LINE/DISCONNECT_PENDING",
    DIRECT_LINE_DISCONNECT_REJECTED = "DIRECT_LINE/DISCONNECT_REJECTED",
    DIRECT_LINE_DISCONNECT_FULFILLED = "DIRECT_LINE/DISCONNECT_FULFILLED",
    DIRECT_LINE_INCOMING_ACTIVITY = "DIRECT_LINE/INCOMING_ACTIVITY",
    DIRECT_LINE_POST_ACTIVITY = "DIRECT_LINE/POST_ACTIVITY",
    DIRECT_LINE_POST_ACTIVITY_FULFILLED = "DIRECT_LINE/POST_ACTIVITY_FULFILLED",
    DIRECT_LINE_POST_ACTIVITY_PENDING = "DIRECT_LINE/POST_ACTIVITY_PENDING",
    DIRECT_LINE_POST_ACTIVITY_REJECTED = "DIRECT_LINE/POST_ACTIVITY_REJECTED",
    DIRECT_LINE_QUEUE_INCOMING_ACTIVITY = "DIRECT_LINE/QUEUE_INCOMING_ACTIVITY",
    DIRECT_LINE_RECONNECT = "DIRECT_LINE/RECONNECT",
    DIRECT_LINE_RECONNECT_FULFILLED = "DIRECT_LINE/RECONNECT_FULFILLED",
    DIRECT_LINE_RECONNECT_FULFILLING = "DIRECT_LINE/RECONNECT_FULFILLING",
    DIRECT_LINE_RECONNECT_PENDING = "DIRECT_LINE/RECONNECT_PENDING",
    DIRECT_LINE_RECONNECT_REJECTED = "DIRECT_LINE/RECONNECT_REJECTED",
    DIRECT_LINE_UPDATE_CONNECTION_STATUS = "DIRECT_LINE/UPDATE_CONNECTION_STATUS",
}

export enum StoreWebChatEvents {
    WEB_CHAT_CLEAR_SUGGESTED_ACTIONS = "WEB_CHAT/CLEAR_SUGGESTED_ACTIONS",
    WEB_CHAT_DISMISS_NOTIFICATION = "WEB_CHAT/DISMISS_NOTIFICATION",
    WEB_CHAT_EMIT_TYPING_INDICATOR = "WEB_CHAT/EMIT_TYPING_INDICATOR",
    WEB_CHAT_MARK_ACTIVITY = "WEB_CHAT/MARK_ACTIVITY",
    WEB_CHAT_SAGA_ERROR = "WEB_CHAT/SAGA_ERROR",
    WEB_CHAT_SEND_EVENT = "WEB_CHAT/SEND_EVENT",
    WEB_CHAT_SEND_FILES = "WEB_CHAT/SEND_FILES",
    WEB_CHAT_SEND_MESSAGE = "WEB_CHAT/SEND_MESSAGE",
    WEB_CHAT_SEND_MESSAGE_BACK = "WEB_CHAT/SEND_MESSAGE_BACK",
    WEB_CHAT_SEND_POST_BACK = "WEB_CHAT/SEND_POST_BACK",
    // WEB_CHAT_SET_CLOCK_SKEW_ADJUSTMENT: Currently, this action is for testing purposes only.
    // Thus, action creator is not needed.
    WEB_CHAT_SET_CLOCK_SKEW_ADJUSTMENT = "WEB_CHAT/SET_CLOCK_SKEW_ADJUSTMENT",
    WEB_CHAT_SET_DICTATE_INTERIMS = "WEB_CHAT/SET_DICTATE_INTERIMS",
    WEB_CHAT_SET_DICTATE_STATE = "WEB_CHAT/SET_DICTATE_STATE",
    WEB_CHAT_SET_LANGUAGE= "WEB_CHAT/SET_LANGUAGE",
    WEB_CHAT_SET_NOTIFICATION = "WEB_CHAT/SET_NOTIFICATION",
    WEB_CHAT_SET_REFERENCE_GRAMMAR_ID = "WEB_CHAT/SET_REFERENCE_GRAMMAR_ID",
    WEB_CHAT_SET_SEND_BOX = "WEB_CHAT/SET_SEND_BOX",
    WEB_CHAT_SET_SEND_TIMEOUT = "WEB_CHAT/SET_SEND_TIMEOUT",
    WEB_CHAT_SET_SEND_TYPING_INDICATOR = "WEB_CHAT/SET_SEND_TYPING_INDICATOR",
    WEB_CHAT_SET_SUGGESTED_ACTIONS = "WEB_CHAT/SET_SUGGESTED_ACTIONS",
    WEB_CHAT_START_DICTATE = "WEB_CHAT/START_DICTATE",
    WEB_CHAT_START_SPEAKING = "WEB_CHAT/START_SPEAKING",
    WEB_CHAT_STOP_DICTATE = "WEB_CHAT/STOP_DICTATE",
    WEB_CHAT_STOP_SPEAKING = "WEB_CHAT/STOP_SPEAKING",
    WEB_CHAT_SUBMIT_SEND_BOX = "WEB_CHAT/SUBMIT_SEND_BOX",

}

export type StoreEvents = StoreDirectlineEvents | StoreWebChatEvents;

export type EventLogics =  {
    [StoreEvent in StoreEvents]?: string[]
}

export interface Logics {
    [LogicName: string]: LogicInstance
}

export type LogicInstance = (dispatch: any, action?: any) => void