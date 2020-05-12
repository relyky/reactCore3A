import React, { useReducer, createContext, useContext, useDebugValue } from 'react'
import t from 'typy'

// ====== useReducer ======
//# object version
// const { name, value, payload, index } = action;
//# array version
// const [ func, name, value ] = action;
// const [ func, payload ] = action;
// const [ func, name, index, payload] = action;

function reducer(state /* object */, action /* [func, param1, param2, param3, ...] */) {
    const func = action.shift()
    if (!t(func).isFunction) throw new Error('Invalid value type!')
    const paramList = action
    if (!t(paramList).isArray) throw new Error('Invalid value type!')
    return func(state, ...paramList) // invoke action function
}

// action function
function doAssignValue(state /* object */, name /* string */, value /* any */) {
    return { ...state, [name]: value }
}

// action function
function doAssignProps(state /* object */, payload /* object */) {
    return { ...state, ...payload }
}

// action function
function doAddItem2(state /* object */, name /* string */, payload /* object */) {
    const itemList = t(state[name]).isArray ? state[name].slice() : []
    itemList.push({ ...payload, isNew: true })
    return { ...state, [name]: itemList }
}

// action function
function doRemoveItem2(state /* object */, name /* string */, index /* integer */) {
    const itemList = t(state[name]).isArray ? state[name].slice() : []
    itemList.splice(index, 1)
    return { ...state, [name]: itemList }
}

// action function
function doUpdateItem2(state /* object */, name /* string */, index /* integer */, payload /* object */) {
    const itemList = t(state[name]).isArray ? state[name].slice() : []
    itemList[index] = payload
    itemList[index].isDirty = true
    return { ...state, [name]: itemList }
}

// action function
function doToggleItem2(state /* object */, name /* string */, index /* integer */) {
    const itemList = t(state[name]).isArray ? state[name].slice() : []
    itemList[index].isChk = !(itemList[index].isChk)
    return { ...state, [name]: itemList }
}

//// action function
//function doMarkDelItem2(state /* object */, name /* string */, index /* integer */) {
//    const itemList = t(state[name]).isArray ? state[name].slice() : []
//    itemList[index].isDel = true
//    return { ...state, [name]: itemList }
//}

//// action function
//function doCheckAllItem2(state /* object */, name /* string */, flag /* bool */) {
//    const itemList = t(state[name]).isArray ? state[name] : []
//    const newItemList = itemList.map((item, idx) => {
//        item.isChk = flag
//        return item;
//    })
//    return { ...state, [name]: newItemList }
//}


// 再包裝reducer成更易使用的指令
function useFormDataReducer(initialState) {
    const [formData /*state*/, dispatch] = useReducer(reducer, initialState)

    // 包裝 dispatch action
    function assignValue(name /* string */, value /* any */) {
        if (!t(name).isString) throw new Error('Invalid value type!')
        dispatch([doAssignValue, name, value]);
    }

    // 包裝 dispatch action
    function assignProps(payload) {
        if (!t(payload).isObject) throw new Error('Invalid value type!')
        dispatch([doAssignProps, payload]);
    }

    // 包裝 dispatch action
    function addItem2(name, payload) {
        if (!t(name).isString) throw new Error('Invalid value type!')
        if (!t(payload).isObject) throw new Error('Invalid value type!')
        dispatch([doAddItem2, name, payload]);
    }

    // 包裝 dispatch action
    function removeItem2(name, index) {
        if (!t(name).isString) throw new Error('Invalid value type!')
        if (!t(index).isNumber) throw new Error('Invalid value type!')
        dispatch([doRemoveItem2, name, index]);
    }

    // 包裝 dispatch action
    function updateItem2(name, index, payload) {
        if (!t(name).isString) throw new Error('Invalid value type!')
        if (!t(index).isNumber) throw new Error('Invalid value type!')
        if (!t(payload).isObject) throw new Error('Invalid value type!')
        dispatch([doUpdateItem2, name, index, payload]);
    }

    // 包裝 dispatch action
    function toggleItem2(name, index) {
        if (!t(name).isString) throw new Error('Invalid value type!')
        if (!t(index).isNumber) throw new Error('Invalid value type!')
        dispatch([doToggleItem2, name, index]);
    }

    useDebugValue(formData, (formData) => JSON.stringify(formData, null, ' '))
    return [formData, { assignValue, assignProps, addItem2, removeItem2, updateItem2, toggleItem2 }]
}

// ====== createContext ======

const FormDataContext = createContext()

export default function useFormData() {
    return useContext(FormDataContext)
}

export function FormDataProvider({ children, init /* object */ }) {
    const sharedValue = useFormDataReducer(init || {})
    return (
        <FormDataContext.Provider value={sharedValue}>
            {children}
        </FormDataContext.Provider>)
}

/// 應用說明
// step 1: 於上層如 App 或 AppForm 設定組織 
//   <FormDataProvider initialState={initialState}>
// step 2: 於其下層或內層function componnet 叫用：
//   const [formData, { assignValue, assignProps }] = useFormData()
