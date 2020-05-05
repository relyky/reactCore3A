import React, { useEffect } from 'react'
import logo from 'assets/logo.svg'
import './Home.css'
import useAppInfo from 'Hooks/useAppInfo'

export default function Home(props) {
    const [app, { assignAppInfo }] = useAppInfo()

    //## init.
    useEffect(() => {
        // 通報現在在那支作業
        assignAppInfo({ FORM_ID: 'Home', FORM_TITLE: '首頁', FORM_DESCRIPTION: '首頁說明。' })
    },[])

    //console.log('Home', { appInfo })
    return (
        <div className="App">
            <h3 style={{ color: 'red' }}>Bearer Token的逾期檢查無效果</h3>
            <h3 style={{ color: 'red' }}>透過WCF建立商業級服務API也去取存DB，因為EntityFx Core 3.1.3成熟度仍不夠。</h3>

            <header className="App-header">
                <h1>Brand Logo</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <p>Edit <code>src/App.js</code> and save to reload.</p>
                <a className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >Learn React</a>
            </header>
        </div>
    );
}
