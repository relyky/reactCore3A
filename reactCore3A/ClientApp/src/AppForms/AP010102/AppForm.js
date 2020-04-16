import React, { Fragment, useState, useEffect } from 'react'

import useAppInfo from 'Hooks/useAppInfo'
import usePostData from 'Hooks/usePostData'
import useFormData from 'Hooks/useFormData'
import useMetaStore from 'Hooks/useMetaStore'

import image01 from 'assets/image/image01.jpg'
import image02 from 'assets/image/image02.jpg'

//import useAppInfo from '../../Hooks/useAppInfo'
//import useFormData from '../../Hooks/useFormdData'

const APP_ID = "AP010102"
const APP_TITLE = 'Say hi, too'
const APP_DESCRIPTION = '再次歡迎光臨。'

export const profile = { APP_ID, APP_TITLE, APP_DESCRIPTION }
export const initialFormData = {
    foo: 'foo',
    bar: 987654321
}

export default function AppForm() {
    const [appInfo] = useAppInfo()
    const [formData, { assignProps }] = useFormData()
    const [meta, { assignMeta }] = useMetaStore()
    const [{ postData }, f_loading] = usePostData()


    return (
        <Fragment>
            <h1>{APP_TITLE} - {APP_ID}</h1>
            <p>{APP_DESCRIPTION}</p>

            <hr />



            <hr />
            <p>圖一
                <img src={image01} alt="廚房" />
            </p>
            <p>圖二
                <img src={image02} alt="電器櫃" />
            </p>
        </Fragment>
    )
}
