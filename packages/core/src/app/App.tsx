import React from 'react';
import ReactWebChat from "botframework-webchat";

// import './App.scss';
import {ConvodroidBFRWebchatCore} from "./ConvodroidBFRWebchatCore";

export default function App(
    props:{
        CORE: ConvodroidBFRWebchatCore
    }
) {
  return (
    <div id={'convodroid__bfrwebchat'} style={{width: "100%", height: "100%"}}>
        <ReactWebChat
            userID={props.CORE.Middlewares.UserMWR.Config.id}
            username={props.CORE.Middlewares.UserMWR.Config.name}
            adaptiveCardsHostConfig={props.CORE.Middlewares.AdaptiveCardsHostConfigMWR.LockedHostConfig}
            directLine={props.CORE.Middlewares.DirectlineMWR.Connection}
            store={props.CORE.Middlewares.StoreMWR.Store}
            styleOptions={props.CORE.Middlewares.StyleOptionsMWR.LockedStyleOptions}
            locale={'en-US'}
        />
    </div>
  );
}
