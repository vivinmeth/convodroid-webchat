import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './app/App';
import reportWebVitals from "./reportWebVitals";

export const ConvodroidReactBFRWebchat = App;

export const bootstrap = (WebChatRootElementId: string) => {
    ReactDOM.render(
        <React.StrictMode>
            <ConvodroidReactBFRWebchat />
        </React.StrictMode>,
        document.getElementById(WebChatRootElementId)
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
}
