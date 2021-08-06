import React, {useMemo} from 'react';
import ReactWebChat, {createDirectLine} from "botframework-webchat";


import './App.scss';
import adaptiveCardsHostConfig from "./configs/adaptiveCardsHostConfig.config";
import styleOptions from './configs/styleOptions.config';
import FullBundleStyleOptions from "botframework-webchat/lib/types/FullBundleStyleOptions";

export default function App() {
  const directline = useMemo(() => createDirectLine({
      token: 'TwbA_KoJmQU.3-BAeeMaH_O2FvFnZ6Ez2Phc6VilHNoRvGslZ3mXmiU',
      // domain: 'http://localhost:5003/directline'
  }), []);
  directline.connectionStatus$.subscribe(status => {
    console.log('Directline -> Connnection Status:', status, directline);
  });
  return (
    <div id={'convodroid__bfrwebchat'}>
        <ReactWebChat
            userID={'vivinmeth.lv@emplay.net'}
            username={'vivinmeth'}
            adaptiveCardsHostConfig={{...adaptiveCardsHostConfig}}
            directLine={directline}
            styleOptions={styleOptions as FullBundleStyleOptions}
        />
    </div>
  );
}
