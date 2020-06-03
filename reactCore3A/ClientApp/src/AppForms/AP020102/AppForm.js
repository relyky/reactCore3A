import React from 'react'
//import { showLastErrMsg } from 'Common/LastErrMsg'
import { InputText } from 'widgets/InputText'

import useAppInfo from 'Hooks/useAppInfo'
//import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'
import usePostData from 'Hooks/usePostData'
import { useSelector } from 'react-redux'
import { useStoreActions } from 'store/store.js'

//import { assignValue, assignProps } from 'store/formDataSlice'

export default function AppForm({ formProfile }) {
    const [appInfo/*, { assignAppInfo }*/] = useAppInfo()
    //const [formData, { assignValue, assignProps }] = useFormData()
    const [meta/*, { assignMeta }*/] = useMetaStore()
    const [{ postData }/*, f_loading*/] = usePostData({ baseUrl: 'api/SimpleForm', trace: false })

    const { formData } = useSelector(store => store)
    const { assignValue, assignProps } = useStoreActions()

    const count = formData.count || 0
   
    console.log(formProfile.FORM_ID, { appInfo, formData, meta, count })
    return (
        <div>
            <pre>
                <h4>count</h4>
                {count}
            </pre>
            <button onClick={() => assignValue('count', count + 1)}> + </button>
            <button onClick={() => assignProps({ count: count - 1 })}> - </button>

            <InputText name="height" type="text" value={formData.height}
                onChange={assignValue}
                placeholder="身高" /><br />
        </div>
    )
}
