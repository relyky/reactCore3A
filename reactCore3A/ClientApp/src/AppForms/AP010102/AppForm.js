import React, { Fragment, useState, useEffect } from 'react'

//import useAppInfo from '../../Hooks/useAppInfo'
//import useFormData from '../../Hooks/useFormdData'

const APP_ID = "AP010102"
const APP_TITLE = 'Say hi, too'
const APP_DESCRIPTION = '再次歡迎光臨。'

export const profile = { APP_ID, APP_TITLE, APP_DESCRIPTION }
export const initialFormData = {
    foo: 'foo',
    bar: 987654321
}

export default function AppForm() {
    //const [myName, setMyName] = useState('')
    //const [formData, { assignValue, assignProps }] = useFormData()

    //useEffect(() => {
    //    setMyName('somebody')
    //}, []) // 等同 componentDidMount

    //function handleEvent(e) {
    //    setMyName(e.target.value)
    //}

    return (
        <Fragment>
            <h1>{APP_TITLE} - {APP_ID}</h1>
            <p>{APP_DESCRIPTION}</p>
            {/*
            <p style={{ fontSize: '3em' }}>{`你好，我的名字是${myName}。`}</p>
            <pre style={{ fontSize: '3em' }}>formData: {JSON.stringify(formData)}</pre>
            <hr />
            <input value={myName} onChange={handleEvent} />*/}
        </Fragment>
    )
}
