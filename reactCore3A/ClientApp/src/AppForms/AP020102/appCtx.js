import React, { useEffect } from 'react'
import { useStoreActions } from 'store/store.js'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///

const formProfile = {
    FORM_ID: 'AP020102',
    FORM_TITLE: 'Redex測試',
    FORM_DESCRIPTION: '簡易編輯畫面展示。'
}

const initFormData = {
    idname: 'Sakuragi', /* 識別名稱:string */
    birthday: '2000/04/01', /* 生日:Date */
    introduction: '我是天才櫻木花道。', /* 自我介紹:text */
    height: 188, /* 身高:number */
    lastUpdDtm: null /* 最後異動時間 :Datetime */
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
