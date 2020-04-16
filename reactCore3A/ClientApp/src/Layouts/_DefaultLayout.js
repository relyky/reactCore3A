import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAppInfo from 'Hooks/useAppInfo'

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
    const [appInfo] = useAppInfo()
    return (
        <div>`
            <div>
                <pre>{JSON.stringify(appInfo, null, 2)}</pre>
            </div>
            <nav>
                <h4>功能連結：</h4>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/ap010101">AP010101</Link>
                    </li>
                    <li>
                        <Link to="/ap010102">AP010102</Link>
                    </li>
                </ul>
            </nav>
            <main>
                {props.children}
            </main>
        </div>
    )
}
