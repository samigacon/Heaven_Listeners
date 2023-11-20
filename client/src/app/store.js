import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice';

export default configureStore({
    reducer: {
        api: apiSlice.reducer,
    },
})