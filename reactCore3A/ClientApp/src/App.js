///
/// 註冊AppForm與Routing。
///
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Layout from './Layouts/_DefaultLayout'
import Home from './Home'
import LoginPage from './Account/Login/appCtx'
import AP010101 from './AppForms/AP010101/appCtx'
import AP010102 from './AppForms/AP010102/appCtx'
import AP010103 from './AppForms/AP010103/appCtx'
import AP020101 from './AppForms/AP020101/appCtx'
import AP020102 from './AppForms/AP020102/appCtx'

//import { useSelector } from 'react-redux'
import { useStoreActions } from 'store/store.js'

// resource
const cookies = new Cookies()
const RequestVerificationToken = cookies.get('__RequestVerificationToken')

//axios.defaults.headers.post['Authorization'] = 'Bearer ' + data.token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['RequestVerificationToken'] = RequestVerificationToken; //cookies.get('__RequestVerificationToken');
alert('refresh antiforgery-token')

/// App
export default function App() {
    const { assignAppInfo } = useStoreActions()

    return (
        <Layout>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path="/login" component={LoginPage} />
                <Route path="/ap010101" component={AP010101} />
                <Route path="/ap010102" component={AP010102} />
                <Route path="/ap010103" component={AP010103} />
                <Route path="/ap020101" component={AP020101} />
                <Route path="/ap020102" component={AP020102} />
            </Switch>
        </Layout>
    );
}