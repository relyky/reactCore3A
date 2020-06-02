import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './Layouts/_DefaultLayout'
import Home from './Home'
import LoginPage from './Account/Login/appCtx'
import AP010101 from './AppForms/AP010101/appCtx'
import AP010102 from './AppForms/AP010102/appCtx'
import AP010103 from './AppForms/AP010103/appCtx'
import AP020101 from './AppForms/AP020101/appCtx'
import AP020102 from './AppForms/AP020102/appCtx'
//import useAppInfo from './Hooks/useAppInfo'

/// 
/// 註冊AppForm與Routing。
///

function App() {
    //const [appInfo, { setAppInfo }] = useAppInfo()
    //console.log('App', { appInfo })
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

export default App;
