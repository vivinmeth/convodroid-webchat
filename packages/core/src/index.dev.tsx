import {newInstance} from "./index";

export * from './index';

const CWC = newInstance();
CWC.Middlewares.DirectlineMWR.Config.secret = prompt('Enter Directline Secret');
CWC.bootstrap({Id:'convodroid__bfrwebchat__root'});
