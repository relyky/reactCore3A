import React, { useEffect } from 'react'
import { FormDataProvider } from 'Hooks/useFormData'
import { MetaStoreProvider } from 'Hooks/useMetaStore'
import useAppInfo from 'Hooks/useAppInfo'
import AppForm from './AppForm'

const formProfile = {
    FORM_ID: 'AP010103',
    FORM_TITLE: '通訊測試',
    FORM_DESCRIPTION: '通訊測試說明。'
}

const initFormData = {
    foo: 'foo',
    bar: 987654321
}

const initMeta = {}

export default (props) => {
    const [/*appInfo*/, { assignAppInfo }] = useAppInfo();

    //## init.通報現在在那支作業
    useEffect(() => assignAppInfo({ ...formProfile }), [])

    return (
        <FormDataProvider init={initFormData}>
            <MetaStoreProvider init={initMeta}>
                <AppForm formProfile={formProfile} />
            </MetaStoreProvider>
        </FormDataProvider>
    )
}

