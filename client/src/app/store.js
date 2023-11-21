import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/api/authApi';
import { discogsApi } from '../features/api/discogsApi';

export default configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [discogsApi.reducerPath]: discogsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(discogsApi.middleware),
})
