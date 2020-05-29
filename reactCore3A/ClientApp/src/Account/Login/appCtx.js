import React from 'react'
import { FormDataProvider } from 'Hooks/useFormData'
import { MetaStoreProvider } from 'Hooks/useMetaStore'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///

const formProfile = {
    FORM_ID: 'LOGIN',
    FORM_TITLE: '登入畫面',
    FORM_DESCRIPTION: '歡迎光臨登入畫面。'
}

const initFormData = {
    userId: '',
    mima: ''
}

const initMeta = {}

export default function appCtx(props) {
    return (
        <FormDataProvider init={initFormData}>
            <MetaStoreProvider init={initMeta}>
                <AppForm formProfile={formProfile} />
            </MetaStoreProvider>
        </FormDataProvider>
    )
}
