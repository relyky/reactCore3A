//import 'bootstrap/dist/css/bootstrap.css';
//import './scss/custom.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppInfoProvider } from './Hooks/useAppInfo'
import axios from 'axios'
import Cookies from 'universal-cookie'

console.log('Page refresh')

// resource
const cookies = new Cookies()

//axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['RequestVerificationToken'] = cookies.get('__RequestVerificationToken');;

ReactDOM.render(
    <BrowserRouter>
        <AppInfoProvider>
            <App />
        </AppInfoProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
