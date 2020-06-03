import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store.js'
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
