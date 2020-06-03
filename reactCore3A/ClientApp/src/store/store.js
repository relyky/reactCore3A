import { configureStore } from '@reduxjs/toolkit';
import counter from './counterSlice';
import formData from './formDataReducer';

export default configureStore({
    reducer: {
        formData,
        counter,
    },
    devTools: process.env.NODE_ENV !== 'production'
});
