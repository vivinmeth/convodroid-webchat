import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {newInstance} from "@convodroid/bfrwebchat-core";

const CWC = newInstance();
CWC.Middlewares.DirectlineMWR.Config.secret = prompt('Enter Directline Secret [react-host]:');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


CWC.bootstrap({Id:'webchat__root'});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
