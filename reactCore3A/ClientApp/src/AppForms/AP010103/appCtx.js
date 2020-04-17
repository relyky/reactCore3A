import React from 'react'
import { FormDataProvider } from 'Hooks/useFormData'
import { MetaStoreProvider } from 'Hooks/useMetaStore'
import AppForm from './AppForm'

export default function appCtx(props) {
    return (
        <FormDataProvider>
            <MetaStoreProvider>
                <AppForm />
            </MetaStoreProvider>
        </FormDataProvider>
    )
}
