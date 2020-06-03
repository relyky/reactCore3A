import React from 'react'
//import { showLastErrMsg } from 'Common/LastErrMsg'
import { InputText } from 'widgets/InputText'

import useAppInfo from 'Hooks/useAppInfo'
//import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'
import usePostData from 'Hooks/usePostData'

import { useSelector, useDispatch } from 'react-redux'
//import {
//    decrement,
//    increment,
//    incrementByAmount,
//    incrementAsync,
//    selectCount,
//} from 'store/counterSlice'

import {
    assignValue, assignProps
} from 'store/formDataReducer'

export default function AppForm({ formProfile }) {
    const [appInfo/*, { assignAppInfo }*/] = useAppInfo()
    //const [formData, { assignValue, assignProps }] = useFormData()
    const [meta/*, { assignMeta }*/] = useMetaStore()
    const [{ postData }/*, f_loading*/] = usePostData({ baseUrl: 'api/SimpleForm', trace: false })

    const dispatch = useDispatch(); 
    const formData = useSelector(store => store.formData);

    const count = formData.count || 0
   

    console.log(formProfile.FORM_ID, { appInfo, formData, meta, count })
    return (
        <div>
            <pre>
                <h4>count</h4>
                {count}
            </pre>
            <button onClick={() => dispatch(assignValue({ name:'count', value: count + 1}))}> + </button>
            <button onClick={() => dispatch(assignProps({ count: count - 1 }))}> - </button>

            <InputText name="height" type="text" value={formData.height}
                onChange={assignValue}
                placeholder="身高" /><br />
        </div>
    )
}
