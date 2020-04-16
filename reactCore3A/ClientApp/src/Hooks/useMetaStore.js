import React, { createContext, useState, useContext, /*, useDebugValue*/ } from 'react'
import t, { Schema } from 'typy'

//## resource
const initAppInfo = {
    loginUserId: '',
    loginUserName: '來賓',
    f_blocking: false
}

//const appInfoSchema = {
//    loginUserId: Schema.String,
//    loginUserName: Schema.String,
//    f_blocking: Schema.Boolean,
//}

//## GO
const MetaStoreContext = createContext()

export default function useMetaStore() {
    return useContext(MetaStoreContext)
}

export function MetaStoreProvider({ children }) {
    const [store, setStore] = useState({})

    function set assignAppInfo(newInfo /* object */) {
        if (!t(newInfo).isObject) throw new Error('Invalid value type!')
        setAppInfo({ ...appInfo, ...newInfo })
    }

    function resetAppInfo() {
        setAppInfo(initAppInfo)
    }

    return (
        <MetaStoreContext.Provider value={[appInfo, { assignAppInfo, resetAppInfo }]}>
            {children}
        </MetaStoreContext.Provider>)
}
