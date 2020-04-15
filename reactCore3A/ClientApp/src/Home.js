﻿import React from 'react'
import logo from 'assets/logo.svg'
import './Home.css'

export default function Home(props) {
    return (
        <div class="App">
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
