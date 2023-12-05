import { configureStore } from '@reduxjs/toolkit'
import { discogsApi } from '../features/api/discogsApi';

export default configureStore({
    reducer: {
        [discogsApi.reducerPath]: discogsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(discogsApi.middleware),
})
