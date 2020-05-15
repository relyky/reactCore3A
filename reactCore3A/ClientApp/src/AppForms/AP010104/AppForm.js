import React, { useEffect } from 'react'
//import { showLastErrMsg } from 'Common/LastErrMsg'
import useAppInfo from 'Hooks/useAppInfo'
import useFormData from 'Hooks/useFormData'
//import useMetaStore from 'Hooks/useMetaStore'
//import usePostData from 'Hooks/usePostData'
//import useLoad from 'Hooks/useLoad'
import useCookies from 'Hooks/useCookies'
import { InputText } from 'widgets/InputText'

export default function AppForm({ formProfile }) {
    const [appInfo, { assignAppInfo }] = useAppInfo()
    const [formData, { assignValue, assignProps }] = useFormData()
    //const [meta, { assignMeta }] = useMetaStore()
    //const [{ postData }, f_loading] = usePostData({ baseUrl: 'api/Account', trace: false })
    const [cookies, setCookie] = useCookies()

    //## init.通報現在在那支作業
    useEffect(() => assignAppInfo({ ...formProfile }), [])

    function handleSetCookie() {
        console.log('handleSetCookie', formData)
        setCookie(formData.ckname, formData.ckvalue)
    }

    //console.log(formProfile.FORM_ID, { appInfo, formData, meta })
    return (
        <div>
            <InputText name="ckname" type="text" value={formData.ckname}
                onChange={assignValue}
                placeholder="cookie name" />
            <InputText name="ckvalue" type="text" value={formData.ckvalue}
                onChange={assignValue}
                placeholder="cookie value" />
            <button onClick={handleSetCookie}>set cookie</button>
            <hr />
            <pre>
                <h4>My Cookies</h4>
                {JSON.stringify(cookies, null, '  ')}
            </pre>
        </div>
    )
}
