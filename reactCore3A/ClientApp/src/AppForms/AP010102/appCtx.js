import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store.js'
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
