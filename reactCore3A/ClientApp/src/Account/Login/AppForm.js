﻿import React from 'react'
import { showLastErrMsg } from 'Common/LastErrMsg'
import axios from 'axios'
import { InputText } from 'widgets/InputText'
import Cookies from 'universal-cookie'

import { useSelector } from 'react-redux'
import { useStoreActions } from 'store/store.js'
import usePostData from 'Hooks/usePostData'
//import useLoad from 'Hooks/useLoad'


// resource
const cookies = new Cookies()

export default function AppForm({ formProfile }) {
    const { appInfo, formData, meta } = useSelector(store => store)
    const { assignAppInfo, assignValue, assignMeta } = useStoreActions()
    const [{ postData } /*, f_loading*/] = usePostData({ baseUrl: 'api/Account', trace: false })

    function handleLogin() {
        const args = {
            userId: formData.userId,
            credential: formData.mima
        }
        postData('Login', args).then(data => {
            console.log('handleLogin', data)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            showLastErrMsg({ errMsg: '登入成功', errType: 'SUCCESS' })
        })
    }

    function handleLogin() {
        const args = {
            userId: formData.userId,
            credential: formData.mima
        }
        postData('Login', args).then(data => {
            //console.log('handleLogin', data)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            // And to get login user info
            postData('GetLoginInfo').then(loginInfo => {
                //console.log('GetLoginInfo', data)
                assignAppInfo(loginInfo)
            })
        })
    }

    function handleLogout() {
        postData('Logout').then(console.log);
    }

    function handleGetLoginInfo() {
        postData('GetLoginInfo').then(data => {
            //console.log('handleGetUserInfo', data)
            assignMeta({ loginInfo: data })
        })
    }

    function handleGetValues() {
        postData('GetValues').then(data => {
            //debugger
            assignMeta({ values: data })
        }).catch(xhr => {
            console.log('handleGetValues', xhr)
        })
    }

    function handleRefreshCookie() {
        /// use to refresh AccessToken etc.
        postData('RefreshCookie')
            .then((data) => console.log('RefreshCookie', data))
            .finally(() => {
                assignMeta({ cookieList: cookies.getAll() })
            })
    }

    console.log(formProfile.FORM_ID, { appInfo, formData, meta })
    return (
        <div>
            <InputText name="userId" type="text" value={formData.userId}
                onChange={assignValue}
                placeholder="帳號" />
            <InputText name="mima" type="password" value={formData.mima}
                onChange={assignValue}
                placeholder="密碼" />
            <button onClick={handleLogin}>登入</button>
            <button onClick={() => window.location.reload()}>重新刷新畫面</button>
            <hr />
            <button onClick={handleLogout}>登出</button>
            <hr />
            <button onClick={handleGetLoginInfo}>Login Info</button>
            <hr />
            <button onClick={handleGetValues}>values</button>
            <hr />
            <button onClick={handleRefreshCookie}>Refresh Cookie from server</button>
            <hr />
            <pre>
                <h4>meta</h4>
                {JSON.stringify(meta, null, '  ')}
            </pre>
        </div>
    )
}
