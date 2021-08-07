import React, {useMemo} from 'react';
import ReactWebChat, {createDirectLine} from "botframework-webchat";


import './App.scss';
import {StyleOptionsMiddlewareBackEnd, StyleOptionsMiddlewareFrontEnd} from "./middlewares/styleOptions.middleware";
import {
    AdaptiveCardsHostConfigMiddlewareBackEnd,
    AdaptiveCardsHostConfigMiddlewareFrontEnd
} from "./middlewares/adaptiveCardsHostConfig.middleware";

export default function App(
    props: {
    StyleOptionsMWRFrontEnd: StyleOptionsMiddlewareFrontEnd
    AdaptiveCardsHostConfigMWRFrontEnd: AdaptiveCardsHostConfigMiddlewareFrontEnd
    }
) {
  const directline = useMemo(() => createDirectLine({
      token: 'TwbA_KoJmQU.3-BAeeMaH_O2FvFnZ6Ez2Phc6VilHNoRvGslZ3mXmiU',
      // domain: 'http://localhost:5003/directline'
  }), []);
  directline.connectionStatus$.subscribe(status => {
    // console.log('Directline -> Connnection Status:', status, directline);
  });

  const StyleOptionsMWRBackend = new StyleOptionsMiddlewareBackEnd(props.StyleOptionsMWRFrontEnd);
  const AdaptiveCardsHostConfigMWRBackend = new AdaptiveCardsHostConfigMiddlewareBackEnd(props.AdaptiveCardsHostConfigMWRFrontEnd)

  return (
    <div id={'convodroid__bfrwebchat'}>
        <ReactWebChat
            userID={'vivinmeth.lv@emplay.net'}
            username={'vivinmeth'}
            adaptiveCardsHostConfig={{...AdaptiveCardsHostConfigMWRBackend.HostConfig}}
            directLine={directline}
            styleOptions={StyleOptionsMWRBackend.StyleOptions}
        />
    </div>
  );
}
