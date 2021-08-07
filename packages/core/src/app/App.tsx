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
    <div id={'convodroid__bfrwebchat'}>
        <ReactWebChat
            userID={'vivinmeth.lv@emplay.net'}
            username={'vivinmeth'}
            adaptiveCardsHostConfig={props.CORE.Middlewares.AdaptiveCardsHostConfigMWR.LockedHostConfig}
            directLine={directline}
            styleOptions={props.CORE.Middlewares.StyleOptionsMWR.LockedStyleOptions}
        />
    </div>
  );
}
