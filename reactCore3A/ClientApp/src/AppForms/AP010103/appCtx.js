import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store.js'
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
    const { assignAppInfo, setFormData, setMeta } = useStoreActions();

    //## init form & 通報現在在那支作業
    useEffect(() => {
        assignAppInfo(formProfile)
        setFormData(initFormData)
        setMeta(initMeta)
    }, [])

    return (
        <AppForm formProfile={formProfile} />
    )
}

