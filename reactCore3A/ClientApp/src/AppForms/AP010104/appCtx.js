import React, { useEffect } from 'react'
import { FormDataProvider } from 'Hooks/useFormData'
import { MetaStoreProvider } from 'Hooks/useMetaStore'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///

const formProfile = {
    FORM_ID: 'AP010104',
    FORM_TITLE: 'Cookie讀與寫',
    FORM_DESCRIPTION: 'Cookie讀與寫練習。'
}

const initFormData = {}
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
