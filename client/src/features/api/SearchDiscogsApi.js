import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SearchDiscogsApi = createApi({
    reducerPath: 'SearchDiscogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://heaven-listeners-server.vercel.app' }),
    endpoints: (builder) => ({
        search: builder.query({
            query: (searchQuery) => `/api/discogs/search?q=${searchQuery}`,
        }),
    }),
});

export const { useSearchQuery } = SearchDiscogsApi;
export const searchDiscogsReducer = SearchDiscogsApi.reducer;