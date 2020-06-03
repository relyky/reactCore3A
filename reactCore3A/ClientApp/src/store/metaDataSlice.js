import { createSlice } from '@reduxjs/toolkit';
import t from 'typy'

/// 注意：
/// Redux Toolkit allows us to write "mutating" logic in reducers. It
/// doesn't actually mutate the state because it uses the Immer library,
/// which detects changes to a "draft state" and produces a brand new
/// immutable state based off those changes

export default createSlice({
    name: 'metaData',
    initialState: {},
    reducers: {
        /// actor: (state, action) => { ... }
        assignMeta: (state, { payload /* object */ }) => {
            if (!t(payload).isObject) throw new Error('Invalid value type!')
            return { ...state, ...payload }
        },
        setMeta: (state, { payload /* object */ }) => {
            if (!t(payload).isObject) throw new Error('Invalid value type!')
            return { ...payload }
        },
    }
});

//// export actions
//export const { assignMeta, setMeta } = metaDataSlice.actions;

//// export reducer
//export default metaDataSlice.reducer;
