import React, { useEffect } from 'react'

import image01 from 'assets/image/image01.jpg'
import image02 from 'assets/image/image02.jpg'

import useAppInfo from 'Hooks/useAppInfo'
import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'

const formProfile = {
    FORM_ID: 'AP010102',
    FORM_TITLE: 'Say hi, too',
    FORM_DESCRIPTION: '再次歡迎光臨。'
}

const initialFormData = {
    foo: 'foo',
    bar: 987654321
}

export default function AppForm() {
    const [appInfo, { assignAppInfo }] = useAppInfo()
    const [formData, { assignValue, assignProps }] = useFormData()
    const [meta, { assignMeta }] = useMetaStore()

    //## init.
    useEffect(() => {
        // 通報現在在那支作業
        assignAppInfo({ ...formProfile })
        // 初始化
        assignProps(initialFormData)
    },[])

    console.log('AP010102', { appInfo, formData, meta })
    return (
        <div>
            <p>圖一
                <img src={image01} alt="廚房" />
            </p>
            <p>圖二
                <img src={image02} alt="電器櫃" />
            </p>
        </div>
    )
}
