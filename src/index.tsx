import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

if (!process.env.REACT_APP_GENERATOR_URL_BASE) {
  throw new Error("Please add env variables.");
}

const token = sessionStorage.getItem('token') ?? '';

axios.interceptors.request.use(request => {
  if (!!request?.headers) {
    request.headers["X-JWT-Token"] = token
  }
  return request;
}, error => {
  return Promise.reject(error);
});

// @ts-ignore
declare global {
  // tslint:disable-next-line
  interface Window {
    web3: any;
    ethereum: any;
    Web3Modal: any;
    Box: any;
    box: any;
    space: any;
    [name: string]: any;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
