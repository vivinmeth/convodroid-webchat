import {createStore} from 'botframework-webchat';

import {
    EventLogics,
    LogicInstance,
    Logics,
    StoreEvents,
} from "../types";

export class StoreMiddleware{
    #EVENT_LOGICS: EventLogics = {};

    #LOGICS: Logics = {}

    #PRE_EVENT_LOGICS: string[] = [];
    #POST_EVENT_LOGICS: string[] = [];

    readonly #STORE;

    get Store() {
        return this.#STORE;
    }

    // Returns all registered Logics and their instances.
    get Logics(): any{
        return {
            PRE_EVENT: [...this.#PRE_EVENT_LOGICS],
            EVENT: {...this.#EVENT_LOGICS},
            POST_EVENT: [...this.#POST_EVENT_LOGICS],
            Instances: {...this.#LOGICS}
        };
    }


    constructor() {
        this.#STORE = createStore({}, ({dispatch}: {dispatch: any}) => (next: any) => (action: any) => this.#middleware(dispatch, action, next));
    }

    #middleware = (dispatch: any, action: any, next: any): any => {
        // PRE_EVENT Logics
        for (const PreLogicName of this.#PRE_EVENT_LOGICS){
            const logic = this.#LOGICS[PreLogicName];
            if (logic){
                (logic as Function).apply(null, [dispatch, action])
            }
        }


        // EVENT Logics
        const StoreEvent = action.type as StoreEvents;
        const eventsLogicList = this.#EVENT_LOGICS[StoreEvent];
        if (eventsLogicList && eventsLogicList.length > 0){
            for (const eventLogicName of eventsLogicList){
                const eventLogic = this.#LOGICS[eventLogicName];
                if (eventLogic){
                    (eventLogic as Function).apply(null, [dispatch, action]);
                }
            }
        }

        // POST_EVENT Logics
        for (const PostLogicName of this.#POST_EVENT_LOGICS){
            const logic = this.#LOGICS[PostLogicName];
            if (logic){
                (logic as Function).apply(null, [dispatch, action])
            }
        }

        return next(action);
    }

    // Adds Event logic.
    // Only gets applied during a StoreEvent.
    // The Logic Name must be unique across all event logics and all pre and post logics.
    // If not unique the logic might get overwritten and end up executed for all the logic call across all events.
    addEventLogic(StoreEvent: StoreEvents, LogicName: string, LogicInstance: LogicInstance){
        const eventLogics = this.#EVENT_LOGICS[StoreEvent];
        if (!eventLogics){
            this.#EVENT_LOGICS[StoreEvent] = [];
        }
        if (!this.#EVENT_LOGICS[StoreEvent]?.includes(StoreEvent)){
            (this.#EVENT_LOGICS[StoreEvent] as string[]).push(LogicName);
            this.#LOGICS[LogicName] = LogicInstance;
        }
    }

    // Adds Pre or Post event logic.
    // The Logic Name must be unique across all event logics and all pre and post logics.
    // If not unique the logic might get overwritten and end up executed for all the logic call across all events.
    addLogic(LogicName: string, LogicInstance: LogicInstance, IS_POST_LOGIC = false){
        let LOGICS;
        if (IS_POST_LOGIC){
            LOGICS = this.#POST_EVENT_LOGICS;
        }
        else{
           LOGICS = this.#PRE_EVENT_LOGICS;
        }
        if (!LOGICS.includes(LogicName)){
            LOGICS.push(LogicName);
            this.#LOGICS[LogicName] = LogicInstance;
        }
    }

}
