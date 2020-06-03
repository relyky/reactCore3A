import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux' 
//import counter from './counterSlice';
import formData, { assignValue, assignProps } from './formDataSlice';

export default configureStore({
    reducer: {
        formData,
        counter,
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
    }
}

