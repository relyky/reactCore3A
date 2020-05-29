import React, { createContext, useState, useContext, /*, useDebugValue*/ } from 'react'
import t from 'typy'

//## resource

//## GO
const MetaStoreContext = createContext()

export default function useMetaStore() {
    return useContext(MetaStoreContext)
}

export function MetaStoreProvider({ children, init /* object */  }) {
    const [meta, setMeta] = useState(init || {})

    function assignMeta(newMeta /* object */) {
        if (!t(newMeta).isObject) throw new Error('Invalid value type!') 

        // [{name1, payload1},{name2, payload2}, ...]
        setMeta({ ...meta, ...newMeta })
    }

    return (
        <MetaStoreContext.Provider value={[meta, { assignMeta, setMeta }]}>
            {children}
        </MetaStoreContext.Provider>)
}
