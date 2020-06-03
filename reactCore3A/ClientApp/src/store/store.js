import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux' 
//import counter from './counterSlice';
import formData, { assignValue, assignProps } from './formDataSlice';
import meta, { assignMeta, setMeta } from './metaDataSlice';

export default configureStore({
    reducer: {
        formData,
        meta,
        //counter,
    },
    devTools: process.env.NODE_ENV !== 'production'
});

//-----------------------------------------------------------------------
// wrapping useDispatch more higher
export function useStoreActions() {
    const dispatch = useDispatch()
    return {
        assignValue: (name, value) => dispatch(assignValue({ name, value })),
        assignProps: (payload) => dispatch(assignProps(payload)),
        assignMeta: (payload) => dispatch(assignMeta(payload)),
        setMeta: (payload) => dispatch(setMeta(payload))
    }
}

