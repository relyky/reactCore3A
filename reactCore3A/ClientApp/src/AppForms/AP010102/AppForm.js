import React, { useEffect } from 'react'

import image01 from 'assets/image/image01.jpg'
import image02 from 'assets/image/image02.jpg'

import useAppInfo from 'Hooks/useAppInfo'
import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'

export default function AppForm({ formProfile }) {
    const [appInfo, { assignAppInfo }] = useAppInfo()
    const [formData /*, { assignValue, assignProps }*/] = useFormData()
    const [meta, /*{ assignMeta }*/] = useMetaStore()

    //## init.通報現在在那支作業
    useEffect(() => assignAppInfo({ ...formProfile }), [formProfile])

    console.log(formProfile.FORM_ID, { appInfo, formData, meta })
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
