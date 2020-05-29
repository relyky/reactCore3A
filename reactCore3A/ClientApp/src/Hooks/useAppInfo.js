import React, { createContext, useState, useContext, /*, useDebugValue*/ } from 'react'
import t, { /*Schema*/ } from 'typy'

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
const AppInfoContext = createContext()

export default function useAppInfo() {
    return useContext(AppInfoContext)
}

export function AppInfoProvider({ children }) {
    const [appInfo, setAppInfo] = useState(initAppInfo)

    function assignAppInfo(newInfo /* object */) {
        if (!t(newInfo).isObject) throw new Error('Invalid value type!')
        setAppInfo({ ...appInfo, ...newInfo })
    }

    function resetAppInfo() {
        setAppInfo(initAppInfo)
    }

    return (
        <AppInfoContext.Provider value={[appInfo, { assignAppInfo, resetAppInfo }]}>
            {children}
        </AppInfoContext.Provider>)
}
