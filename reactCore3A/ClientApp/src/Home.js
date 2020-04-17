import React, { useEffect } from 'react'
import logo from 'assets/logo.svg'
import './Home.css'
import useAppInfo from 'Hooks/useAppInfo'

export default function Home(props) {
    const [appInfo, { assignAppInfo }] = useAppInfo()

    //## init.
    useEffect(() => {
        // 通報現在在那支作業
        assignAppInfo({ FORM_ID: 'Home', FORM_TITLE: '首頁', FORM_DESCRIPTION: '首頁說明。' })
    },[])

    //console.log('Home', { appInfo })
    return (
        <div className="App">
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
