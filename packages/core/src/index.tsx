import './styles/main.scss';
import App from './app/App';
import {ConvodroidBFRWebchatCore} from "./app/ConvodroidBFRWebchatCore";
export * from './app/middlewares';

export const ConvodroidReactBFRWebchat = App;

export const newInstance = () => {
    return new ConvodroidBFRWebchatCore();
};

