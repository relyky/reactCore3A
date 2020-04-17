import React, { useEffect } from 'react'
import swal from 'sweetalert2'

import useAppInfo from 'Hooks/useAppInfo'
import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'
import usePostData from 'Hooks/usePostData'

const formProfile = {
    FORM_ID:'AP010103',
    FORM_TITLE: '通訊測試',
    FORM_DESCRIPTION: '通訊測試說明。'
}

const initialFormData = {
    foo: 'foo',
    bar: 987654321
}

export default function AppForm() {
    const [appInfo, { assignAppInfo }] = useAppInfo()
    const [formData, { assignValue, assignProps }] = useFormData()
    const [meta, { assignMeta }] = useMetaStore()
    const [{ postData, downloadFile }, f_loading] = usePostData({ baseUrl: '/api/WeatherForecast' })
 
    //## init.
    useEffect(() => {
        // 通報現在在那支作業
        assignAppInfo({ ...formProfile })
        // 初始化
        assignProps(initialFormData)
    },[])

    function qryDataList() {
        const args = { accInfo: 'foo' }
        postData('QryDataList', args).then(dataList => {
            assignMeta({ dataList })
        })
    }

    console.log('AP010103', { appInfo, formData, meta })
    return (
        <div>

            <button onClick={qryDataList}>查詢</button>

            {/*
            <p style={{ fontSize: '3em' }}>{`你好，我的名字是${myName}。`}</p>
            <pre style={{ fontSize: '3em' }}>formData: {JSON.stringify(formData)}</pre>
            <hr />
            <input value={myName} onChange={handleEvent} />*/}
        </div>
    )
}
