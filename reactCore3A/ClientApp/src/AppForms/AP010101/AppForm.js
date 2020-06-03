import React from 'react'
import swal from 'sweetalert2'

import { useSelector } from 'react-redux'
//import { useStoreActions } from 'store/store.js'

export default function AppForm({ formProfile }) {
    const { appInfo, formData, meta } = useSelector(store => store)

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

    console.log(formProfile.FORM_ID, { appInfo, formData, meta })
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
