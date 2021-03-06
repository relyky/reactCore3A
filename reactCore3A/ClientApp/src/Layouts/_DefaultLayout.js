﻿import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux' 

//import clsx from 'clsx'
//import { makeStyles, useTheme } from '@material-ui/core/styles'
//import Drawer from '@material-ui/core/Drawer'
//import CssBaseline from '@material-ui/core/CssBaseline'
//import AppBar from '@material-ui/core/AppBar'
//import Toolbar from '@material-ui/core/Toolbar'
//import Typography from '@material-ui/core/Typography'
//import IconButton from '@material-ui/core/IconButton'
//import MenuIcon from '@material-ui/icons/Menu'
//import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
//import ChevronRightIcon from '@material-ui/icons/ChevronRight'
//import { NavMenu } from './NavMenu'
//import useAppInfo from '../Hooks/useAppInfo'
//import UIBlocker from 'react-ui-blocker'

/// PersistentDrawerLeft
export default function DefaultLayout(props) {
    const appInfo = useSelector(store => store.appInfo)
    return (
        <div>`
            <div>
                <pre>{JSON.stringify(appInfo, null, 2)}</pre>
            </div>
            <nav>
                <h4>功能連結：</h4>
                <ul>
                    <li style={menuItemStyle}>
                        <Link to="/">Home</Link>
                    </li>
                    <li style={menuItemStyle}>
                        <Link to="/Login">Login</Link>
                    </li>
                    <li style={menuItemStyle}>
                        <Link to="/ap010101">AP010101</Link>
                    </li>
                    <li style={menuItemStyle}>
                        <Link to="/ap010102">AP010102</Link>
                    </li>
                    <li style={menuItemStyle}>
                        <Link to="/ap010103">AP010103</Link>
                    </li>
                    <li style={menuItemStyle}>
                        <Link to="/ap020101">AP020101</Link>
                    </li>
                    <li style={menuItemStyle}>
                        <Link to="/ap020102">AP020102</Link>
                    </li>
                </ul>
            </nav>
            <main>
                {props.children}
            </main>
        </div>
    )
}

// CSS Style
const menuItemStyle = {
    display: 'inline-block',
    marginLeft: '1em'
}
