import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.interceptors.request.use(request => {
  const token = sessionStorage.getItem('token') ?? '';
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

setTimeout(() => {
  ReactDOM.render(
    <React.StrictMode>
      <div style={{minHeight: '100vh', position: 'relative'}}>
        <div style={{paddingBottom: '2.5rem'}}>
          <App />
        </div>
      </div>
    </React.StrictMode>,
    document.getElementById('root')
  );
  
}, 10);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
