import { createSlice } from '@reduxjs/toolkit';
import t from 'typy'

// resource
const initAppInfo = {
    loginUserId: '',
    loginUserName: '來賓',
    f_blocking: false
}

export default createSlice({
    name: 'appInfo',
    initialState: initAppInfo,
    reducers: {
        assignAppInfo: (state, { payload }) => {
            if (!t(payload).isObject) throw new Error('Invalid value type!')
            return { ...state, ...payload }
        },
        resetAppInfo: (state) => {
            return { ...initAppInfo }
        },
        setBlocking: (state, { payload }) => {
            if (!t(payload).isBoolean) throw new Error('Invalid value type!')
            state.f_blocking = !!(payload)
        }, 
    }
});

