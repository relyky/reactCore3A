import React from 'react'
import { FormDataProvider } from 'Hooks/useFormData'
import { MetaStoreProvider } from 'Hooks/useMetaStore'
import AppForm, { profile, initialFormData } from './AppForm'

export default function appCtx(props) {

    /// 在此檢查是否有權限執行。(profile)
    if (!profile) {
        return (<h1>無權限執行此作業。</h1>)
    }

    return (
        <FormDataProvider initialState={initialFormData}>
            <MetaStoreProvider>
                <AppForm />
            </MetaStoreProvider>
        </FormDataProvider>
    )
}
