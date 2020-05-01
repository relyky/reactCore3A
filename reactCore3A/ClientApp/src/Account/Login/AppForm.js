import React, { useState, useEffect } from 'react'
import swal from 'sweetalert2'

import useAppInfo from 'Hooks/useAppInfo'
import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'
import usePostData from 'Hooks/usePostData'
import useLoad from 'Hooks/useLoad'

export default function AppForm({formProfile}) {
    const [appInfo, { assignAppInfo }] = useAppInfo()
    const [formData, { assignValue, assignProps }] = useFormData()
    const [meta, { assignMeta }] = useMetaStore()
    const [{ postData }, f_loading] = usePostData({ baseUrl: 'api/Account', trace: true })

    //## init.通報現在在那支作業
    useEffect(() => assignAppInfo({ ...formProfile }), [])

    function handleLogin()
    {
        const args = {
            userId: formData.userId,
            credential: formData.mima
        }
        postData('Login', args).then(console.log)
    }

    console.log(formProfile.FORM_TITLE, { appInfo, formData, meta })
    return (
        <div>
            <InputText name="userId" type="text" value={formData.userId}
                onChange={assignValue}
                placeholder="帳號" />
            <InputText name="mima" type="password" value={formData.mima}
                onChange={assignValue}
                placeholder="密碼" />
            <button onClick={handleLogin}>登入</button>
        </div>
    )
}

function InputText(props)
{
    return (
        <input {...props} onChange={e => props.onChange && props.onChange(e.target.name, e.target.value)} />
    )
}