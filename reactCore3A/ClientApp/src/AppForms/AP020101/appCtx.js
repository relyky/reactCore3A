﻿import React, { useEffect } from 'react'
import { FormDataProvider } from 'Hooks/useFormData'
import { MetaStoreProvider } from 'Hooks/useMetaStore'
import AppForm from './AppForm'

///
/// 只給予常數初始化
///

const formProfile = {
    FORM_ID: 'AP020101',
    FORM_TITLE: '簡易畫面',
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

export default function appCtx(props) {
    return (
        <FormDataProvider init={initFormData}>
            <MetaStoreProvider init={initMeta}>
                <AppForm formProfile={formProfile} />
            </MetaStoreProvider>
        </FormDataProvider>
    )
}