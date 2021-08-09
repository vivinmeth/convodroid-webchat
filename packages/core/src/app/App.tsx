import React, {useMemo} from 'react';
import ReactWebChat, {createDirectLine} from "botframework-webchat";

import './App.scss';
import {ConvodroidBFRWebchatCore} from "./ConvodroidBFRWebchatCore";

export default function App(
    props:{
        CORE: ConvodroidBFRWebchatCore
    }
) {
    const DirectlineConfig = props.CORE.Middlewares.DirectlineMWR.LockedConfig;



    const directline = useMemo(() => createDirectLine(DirectlineConfig), [DirectlineConfig]);
  directline.connectionStatus$.subscribe(status => {
    // console.log('Directline -> Connnection Status:', status, directline);
  });

  return (
    <div id={'convodroid__bfrwebchat'} style={{width: "100%", height: "100%"}}>
        <ReactWebChat
            userID={props.CORE.Middlewares.UserMWR.Config.id}
            username={props.CORE.Middlewares.UserMWR.Config.name}
            adaptiveCardsHostConfig={props.CORE.Middlewares.AdaptiveCardsHostConfigMWR.LockedHostConfig}
            directLine={directline}
            store={props.CORE.Middlewares.StoreMWR.Store}
            styleOptions={props.CORE.Middlewares.StyleOptionsMWR.LockedStyleOptions}
            locale={'en-US'}
        />
    </div>
  );
}
