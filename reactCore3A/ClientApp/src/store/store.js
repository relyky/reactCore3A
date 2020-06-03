import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux' 
//import counter from './counterSlice';
import formDataSlice from './formDataSlice';
import metaDataSlice from './metaDataSlice';

export default configureStore({
    reducer: {
        formData: formDataSlice.reducer,
        meta: metaDataSlice.reducer,
        //counter,
    },
    devTools: process.env.NODE_ENV !== 'production'
});

//-----------------------------------------------------------------------

// action list
const { assignValue, assignProps } = formDataSlice.actions
const { assignMeta, setMeta } = metaDataSlice.actions

// wrapping "dispatch(action)" with useDispatch more higher
export function useStoreActions() {
    const dispatch = useDispatch()
    return {
        assignValue: (name, value) => dispatch(assignValue({ name, value })),
        assignProps: (payload) => dispatch(assignProps(payload)),
        assignMeta: (payload) => dispatch(assignMeta(payload)),
        setMeta: (payload) => dispatch(setMeta(payload))
    }
}

