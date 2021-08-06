import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './app/App';
import reportWebVitals from "./reportWebVitals";
import {StyleOptionsMiddlewareFrontEnd} from "./app/middlewares/styleOptions.middleware";

export const ConvodroidReactBFRWebchat = App;

export const StyleOptionsMiddleware = new StyleOptionsMiddlewareFrontEnd();


export const bootstrap = (container: { Id?: string, Element?: (HTMLElement | null)}) => {
    let element;

    if (!container.Id && !container.Element){
        console.error('ConvodroidBFRWebchatCore -> bootstrap failed! Empty container config passed!');
        return;
    }
    else if (container.Id){
        element = document.getElementById(container.Id)
        if (!element){
            console.error("ConvodroidBFRWebchatCore -> bootstrap failed! Container ", container, "not defined!");
            return;
        }
    }

    ReactDOM.render(
        <React.StrictMode>
            <ConvodroidReactBFRWebchat
                StyleOptionsMWRFrontEnd={StyleOptionsMiddleware}
            />
        </React.StrictMode>,
        container.Element || element as HTMLElement);

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();

}

