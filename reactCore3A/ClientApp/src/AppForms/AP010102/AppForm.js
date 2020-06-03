import React from 'react'

import image01 from 'assets/image/image01.jpg'
import image02 from 'assets/image/image02.jpg'

import { useSelector } from 'react-redux'
//import { useStoreActions } from 'store/store.js'

export default function AppForm({ formProfile }) {
    const { appInfo, formData, meta } = useSelector(store => store)

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
