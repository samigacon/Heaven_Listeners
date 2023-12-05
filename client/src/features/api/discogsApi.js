import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const discogsApi = createApi({
    reducerPath: 'discogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://samigacon.ide.3wa.io:3001' }),
    endpoints: (builder) => ({
        search: builder.query({
            query: (searchQuery) => `/api/discogs/search?q=${searchQuery}`,
        }),
        artist: builder.query({
            query: (artistId) => `/artists/${artistId}`,
        }),
    }),
});

export const { useSearchQuery, useArtistQuery } = discogsApi;
export default discogsApi.reducer;