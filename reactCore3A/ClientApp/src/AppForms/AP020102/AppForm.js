import React from 'react'
//import { showLastErrMsg } from 'Common/LastErrMsg'
import { InputText } from 'widgets/InputText'

import useAppInfo from 'Hooks/useAppInfo'
import usePostData from 'Hooks/usePostData'
import { useSelector } from 'react-redux'
import { useStoreActions } from 'store/store.js'

export default function AppForm({ formProfile }) {
    const [appInfo/*, { assignAppInfo }*/] = useAppInfo()
    const [{ postData }/*, f_loading*/] = usePostData({ baseUrl: 'api/SimpleForm', trace: false })

    const { formData, meta } = useSelector(store => store)
    const { assignValue, assignProps, assignMeta, setMeta } = useStoreActions()

    const count = formData.count || 0

    function doAssignMeta()
    {
        const newMeta = {
            height: formData.height,
            count: (meta.count || 0) + 1
        }
        console.log('doAssignMeta', newMeta)
        assignMeta(newMeta)
    }
   
    console.log(formProfile.FORM_ID, { appInfo, formData, meta })
    return (
        <div>
            <pre>
                <h4>count</h4>
                {count}
            </pre>
            <button onClick={() => assignValue('count', count + 1)}> + </button>
            <button onClick={() => assignProps({ count: count - 1 })}> - </button>

            <InputText name="height" type="text" value={formData.height || 87}
                onChange={assignValue}
                placeholder="身高" /><br />

            <button onClick={() => doAssignMeta()}> assignMeta </button>
            <button onClick={() => setMeta({ height: 987 })}> reset Meta </button>
        </div>
    )
}
