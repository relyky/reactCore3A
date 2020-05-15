import React, { useState, useEffect } from 'react'
import { showLastErrMsg } from 'Common/LastErrMsg'
import axios from 'axios'
import Cookies from 'universal-cookie'

import useAppInfo from 'Hooks/useAppInfo'
import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'
import usePostData from 'Hooks/usePostData'
import useLoad from 'Hooks/useLoad'
import useMyCookies from 'Hooks/useCookies'

// resource
const cookies = new Cookies();

export default function AppForm({ formProfile }) {
    const [appInfo, { assignAppInfo }] = useAppInfo()
    const [formData, { assignValue, assignProps }] = useFormData()
    const [meta, { assignMeta }] = useMetaStore()
    const [{ postData }, f_loading] = usePostData({ baseUrl: 'api/Account', trace: false })

    const [mycookies] = useMyCookies()

    //## init.通報現在在那支作業
    useEffect(() => assignAppInfo({ ...formProfile }), [])

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
                assignAppInfo({ ...loginInfo })
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
        postData('RefreshCookie')
            .then(console.log)
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
            <hr />
            <button onClick={handleLogout}>登出</button>
            <hr />
            <button onClick={handleGetLoginInfo}>Login Info</button>
            <hr />
            <button onClick={handleGetValues}>values</button>
            <hr />
            <button onClick={handleRefreshCookie}>Refresh Cookie</button>
            <hr />
            <pre>
                <h4>meta</h4>
                {JSON.stringify(meta, null, '  ')}
            </pre>
            <hr/>
            <pre>
                <h4>My Cookies</h4>
                {JSON.stringify(mycookies, null, '  ')}
            </pre>
        </div>
    )
}

function InputText(props) {
    return (
        <input {...props}
            value={props.value || ''}
            onChange={e => props.onChange && props.onChange(e.target.name, e.target.value)}
        />
    )
}