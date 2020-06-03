import { createReducer, createAction } from '@reduxjs/toolkit';
import t from 'typy'

const name = 'formData'
const initialState = {}

// actions
export const assignValue = createAction(`${name}/assignValue`)
export const assignProps = createAction(`${name}/assignProps`)

//# reducer
export default createReducer(initialState, {
    /// actor: (state, action) => { ... }
    [assignValue]: (state, { payload }) => {
        const { name, value /* any */ } = payload
        if (!t(name).isString) throw new Error('Invalid value type!')
        state[name] = value
    },
    [assignProps]: (state, { payload /* object */ }) => {
        if (!t(payload).isObject) throw new Error('Invalid value type!')
        return { ...state, ...payload }
    },
});

