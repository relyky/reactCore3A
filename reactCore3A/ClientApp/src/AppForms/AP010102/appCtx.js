import React from 'react'
import { FormDataProvider } from 'Hooks/useFormData'
import { MetaStoreProvider } from 'Hooks/useMetaStore'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///

const formProfile = {
    FORM_ID: 'AP010102',
    FORM_TITLE: 'Say hi, too',
    FORM_DESCRIPTION: '再次歡迎光臨。'
}

const initFormData = {
    foo: 'foo',
    bar: 987654321
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
