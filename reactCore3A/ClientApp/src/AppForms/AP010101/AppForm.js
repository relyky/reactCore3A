import React, { useEffect } from 'react'
import swal from 'sweetalert2'

import useAppInfo from 'Hooks/useAppInfo'
import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'

const formProfile = {
    FORM_ID:'AP010101',
    FORM_TITLE: 'Say hi',
    FORM_DESCRIPTION: '歡迎光臨。'
}

const initialFormData = {
    foo: 'foo',
    bar: 987654321
}

export default function AppForm() {
    const [appInfo, { assignAppInfo }] = useAppInfo()
    const [formData, { /*assignValue,*/ assignProps }] = useFormData()
    const [meta/*, { assignMeta }*/] = useMetaStore()

    //## init.
    useEffect(() => {
        // 通報現在在那支作業
        assignAppInfo({ ...formProfile })
        // 初始化
        assignProps(initialFormData)
    },[])

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

    console.log('AP010101', { appInfo, formData, meta })
    return (
        <div>
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
        </div>
    )
}
