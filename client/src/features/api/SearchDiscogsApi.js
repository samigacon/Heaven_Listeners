import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SearchDiscogsApi = createApi({
    reducerPath: 'SearchDiscogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://samigacon.ide.3wa.io:3001' }),
    endpoints: (builder) => ({
        search: builder.query({
            query: (searchQuery) => `/api/discogs/search?q=${searchQuery}`,
        }),
    }),
});

export const { useSearchQuery } = SearchDiscogsApi;
export const searchDiscogsReducer = SearchDiscogsApi.reducer;