import React, { useState } from 'react'
import { format } from 'date-fns'

import useAppInfo from 'Hooks/useAppInfo'
import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'
import usePostData from 'Hooks/usePostData'
import useLoad from 'Hooks/useLoad'

export default function AppForm({ formProfile }) {
    const [appInfo /*, { assignAppInfo }*/] = useAppInfo()
    const [formData /*,{ assignValue, assignProps }*/] = useFormData()
    const [meta, { assignMeta }] = useMetaStore()
    const [{ postData }, /*f_loading*/] = usePostData({ baseUrl: 'api/WeatherForecast' })

    const [args, setArgs] = useState({ type: 'C' })
    const [weekList, f_WeekLoading, error] = useLoad('api/CommonData/GetWeekList', args)

    function qryDataList() {
        const args = { foo: 'foo' }
        postData('QryDataList', args).then(dataList => {
            assignMeta({ dataList })
        })
    }

    function testDiSample() {
        const args = {}
        postData('/api/CommonData/GetSysEnv', args).then(diSample => {
            assignMeta({ diSample})
        })
    }

    console.log('AP010103', { appInfo, formData, meta, error })
    const { dataList } = meta
    return (
        <div>
            <hr />
            <button onClick={testDiSample}>測試DI</button>
            <pre>{JSON.stringify(meta.diSample)}</pre>
            <hr />
            <input type='text' value={args.type} onChange={(e) => setArgs({ type: e.target.value })} placeholder="請輸入C或E" />
            {f_WeekLoading && <span>Week Loading...</span>}
            <pre>ERROR:{error}</pre>
            <pre>{JSON.stringify(weekList)}</pre>
            <hr />
            <p style={{ marginTop: 10, marginBottom: 10 }}>
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
