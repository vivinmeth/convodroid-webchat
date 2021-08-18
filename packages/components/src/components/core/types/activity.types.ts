import {DirectLineActivity} from "botframework-webchat-core";

export interface ActivityComponentFactoryOptions {
    activity: DirectLineActivity,
    nextVisibleActivity: DirectLineActivity
}
