import React, { useEffect } from 'react'
import { format } from 'date-fns'

import useAppInfo from 'Hooks/useAppInfo'
import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'
import usePostData from 'Hooks/usePostData'

const formProfile = {
    FORM_ID: 'AP010103',
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
    const [{ postData }, f_loading] = usePostData({ baseUrl: '/WeatherForecast' })

    //## init.
    useEffect(() => {
        // 通報現在在那支作業
        assignAppInfo({ ...formProfile })
        // 初始化
        assignProps(initialFormData)
        assignMeta({ dataList: [] })
    }, [])

    function qryDataList() {
        const args = { foo: 'foo' }
        postData('QryDataList', args).then(dataList => {
            assignMeta({ dataList })
        })
    }

    console.log('AP010103', { appInfo, formData, meta })
    const { dataList } = meta
    return (
        <div>
            <hr />
            <p style={{marginTop: 10, marginBottom: 10}}>
                <button onClick={qryDataList}>查詢</button>
            </p>
            <table>
                <thead>
                    <tr>
                        <th>summary</th>
                        <th>temperatureC</th>
                        <th>temperatureF</th>
                        <th>date</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(dataList) && dataList.map((item, index) =>
                        <tr key={index}>
                            <td>{item.summary}</td>
                            <td>{item.temperatureC}</td>
                            <td>{item.temperatureF}</td>
                            <td>{format(new Date(item.date), 'yyyy/MM/dd HH:mm:ss')}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
