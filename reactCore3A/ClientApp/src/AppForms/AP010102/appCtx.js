import React from 'react'
//import { FormDataProvider } from '../../Hooks/useFormdData'
import AppForm, { profilep, initialFormData, profile } from './AppForm'

export default function appCtx(props) {

    /// 在此檢查是否有權限執行。(profile)

    return (
        <AppForm />
    )
}