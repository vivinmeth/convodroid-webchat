import {newInstance} from "./index";

export * from './index';

const autoInit = (new URL(window.location.href)).searchParams.get('autoInit');
console.log(autoInit);

export const CWC = newInstance();

if (autoInit === 'true' || autoInit === '1'){

    CWC.Middlewares.DirectlineMWR.Config.secret = prompt('Enter Directline Secret');
    CWC.bootstrap({Id:'convodroid__bfrwebchat__root'});
}

