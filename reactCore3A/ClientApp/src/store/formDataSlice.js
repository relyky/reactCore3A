import { createSlice } from '@reduxjs/toolkit';
import t from 'typy'

/// 注意：
/// Redux Toolkit allows us to write "mutating" logic in reducers. It
/// doesn't actually mutate the state because it uses the Immer library,
/// which detects changes to a "draft state" and produces a brand new
/// immutable state based off those changes

export const formDataSlice = createSlice({
    name: 'formData',
    initialState: {},
    reducers: {
        /// actor: (state, action) => { ... }
        assignValue: (state, { payload }) => {
            const { name, value /*any*/ } = payload
            if (!t(name).isString) throw new Error('Invalid value type!')
            state[name] = value /// <--- Immmr 模式更新欄位
        },
        assignProps: (state, { payload /* object */ }) => {
            if (!t(payload).isObject) throw new Error('Invalid value type!')
            return { ...state, ...payload } /// <--- Spread Syntax也有效
        },
    }
});

// export actions
export const { assignValue, assignProps } = formDataSlice.actions;

// export reducer
export default formDataSlice.reducer;
