import React from 'react'
//import { showLastErrMsg } from 'Common/LastErrMsg'
import { InputText } from 'widgets/InputText'

import useAppInfo from 'Hooks/useAppInfo'
import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'
import usePostData from 'Hooks/usePostData'
//import useLoad from 'Hooks/useLoad'

export default function AppForm({ formProfile }) {
    const [appInfo/*, { assignAppInfo }*/] = useAppInfo()
    const [formData, { assignValue, assignProps }] = useFormData()
    const [meta/*, { assignMeta }*/] = useMetaStore()
    const [{ postData }/*, f_loading*/] = usePostData({ baseUrl: 'api/SimpleForm', trace: false })

    function handleSave() {
        postData('SaveFormData', formData).then(newFormData => {
            assignProps(newFormData)
        }).catch(xhr => {
            console.log('handleGetValues', xhr)
        })
    }

    console.log(formProfile.FORM_ID, { appInfo, formData, meta })
    return (
        <div>
            <InputText name="idname" type="text" value={formData.idname}
                onChange={assignValue}
                placeholder="識別名稱" /><br/>
            <InputText name="birthday" type="text" value={formData.birthday}
                onChange={assignValue}
                placeholder="生日" /><br />
            <InputText name="introduction" type="text" value={formData.introduction}
                onChange={assignValue}
                placeholder="自我介紹" /><br />
            <InputText name="height" type="text" value={formData.height}
                onChange={assignValue}
                placeholder="身高" /><br />
            <InputText name="lastUpdDtm" type="text" value={formData.lastUpdDtm} readOnly
                onChange={assignValue}
                placeholder="異動時間" /><br />
            <button onClick={handleSave}>存檔</button>
            <pre>
                <h4>meta</h4>
                {JSON.stringify(meta, null, '  ')}
            </pre>
        </div>
    )
}
