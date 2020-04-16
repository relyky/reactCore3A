import React, { Fragment, useState, useEffect } from 'react'
import swal from 'sweetalert2'

import useAppInfo from 'Hooks/useAppInfo'

//import useAppInfo from '../../Hooks/useAppInfo'
//import useFormData from '../../Hooks/useFormdData'

const APP_ID = "AP010101"
const APP_TITLE = 'Say hi'
const APP_DESCRIPTION = '歡迎光臨。'

export const profile = { APP_ID, APP_TITLE, APP_DESCRIPTION }
export const initialFormData = {
    foo: 'foo',
    bar: 987654321
}

export default function AppForm() {
    const [appInfo, { assignAppInfo, resetAppInfo }] = useAppInfo()
    //const [myName, setMyName] = useState('')
    //const [formData, { assignValue, assignProps }] = useFormData()

    //useEffect(() => {
    //    setMyName('somebody')
    //}, []) // 等同 componentDidMount

    //function handleEvent(e) {
    //    setMyName(e.target.value)
    //}

    async function swalPrompt() {
        const { value: password } = await swal.fire({
            icon: 'question',
            title: 'Enter your password',
            input: 'password',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off'
            }
        });

        if (password) {
            swal.fire(`Entered password: ${password}`)
        }
    } 

    console.log('reander', { appInfo, assignAppInfo, resetAppInfo })
    return (
        <Fragment>
            <h1>{APP_TITLE} - {APP_ID}</h1>
            <p>{APP_DESCRIPTION}</p>
            <pre>{JSON.stringify(appInfo)}</pre>

            <button onClick={() => swal.fire({
                icon: 'info',
                title: '測試訊息視窗',
                text: '這裡是訊息內容，這裡是訊息內容，這裡是訊息內容。'
            })}>swal.info</button>

            <button onClick={swalPrompt}>swal.prompt</button>

            {/*
            <p style={{ fontSize: '3em' }}>{`你好，我的名字是${myName}。`}</p>
            <pre style={{ fontSize: '3em' }}>formData: {JSON.stringify(formData)}</pre>
            <hr />
            <input value={myName} onChange={handleEvent} />*/}
        </Fragment>
    )
}
