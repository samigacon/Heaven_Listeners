import { configureStore } from '@reduxjs/toolkit';
import { searchDiscogsReducer, SearchDiscogsApi } from '../features/api/SearchDiscogsApi';
import { releasesDiscogsReducer, ReleasesDiscogsApi } from '../features/api/ReleasesDiscogsApi';

export default configureStore({
    reducer: {
        [SearchDiscogsApi.reducerPath]: searchDiscogsReducer,
        [ReleasesDiscogsApi.reducerPath]: releasesDiscogsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(SearchDiscogsApi.middleware).concat(ReleasesDiscogsApi.middleware),
})
