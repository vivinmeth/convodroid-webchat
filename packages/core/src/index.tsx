import './styles/main.scss';
import App from './app/App';
import * as CORE_MODULE from "./app/ConvodroidBFRWebchatCore";
import * as Middlewares from './app/middlewares';

export const CORE = {
    ...CORE_MODULE,
    Middlewares,
    ConvodroidReactBFRWebchat: App
}

export const newInstance = () => {
    return new CORE_MODULE.ConvodroidBFRWebchatCore();
};
