import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux' 
//import counter from './counterSlice';
import appInfoSlice from './appInfoSlice'
import formDataSlice from './formDataSlice'
import metaDataSlice from './metaDataSlice'

export default configureStore({
    reducer: {
        appInfo: appInfoSlice.reducer,
        formData: formDataSlice.reducer,
        meta: metaDataSlice.reducer,
        //counter,
    },
    devTools: process.env.NODE_ENV !== 'production'
});

//-----------------------------------------------------------------------

// action list
const { assignAppInfo, resetAppInfo, setBlocking } = appInfoSlice.actions
const { assignValue, assignProps } = formDataSlice.actions
const { assignMeta, setMeta } = metaDataSlice.actions

// wrapping "dispatch(action)" with useDispatch more higher
export function useStoreActions() {
    const dispatch = useDispatch()
    return {
        // appInfo actions
        assignAppInfo: (payload) => dispatch(assignAppInfo(payload)),
        resetAppInfo: () => dispatch(resetAppInfo()),
        setBlocking: (f_blocking /* bool */) => dispatch(setBlocking(f_blocking)),

        // formData actions
        assignValue: (name /* string */, value /* any */) => dispatch(assignValue({ name, value })),
        assignProps: (payload) => dispatch(assignProps(payload)),

        // metaData actions
        assignMeta: (payload) => dispatch(assignMeta(payload)),
        setMeta: (payload) => dispatch(setMeta(payload)),
    }
}

