import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './Layouts/_DefaultLayout'
import Home from './Home'
import AP010101 from './AppForms/AP010101/appCtx'
import AP010102 from './AppForms/AP010102/appCtx'
import useAppInfo from './Hooks/useAppInfo'

function App() {
    //const [appInfo, { setAppInfo }] = useAppInfo()
    return (
        <React.Fragment>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path="/ap010101" component={AP010101} />
                    <Route path="/ap010102" component={AP010102} />
                </Switch>
            </Layout>
        </React.Fragment>
    );
}

export default App;
