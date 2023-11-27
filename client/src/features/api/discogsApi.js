import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const localForApi = 'http://samigacon.ide.3wa.io:3001';

export const discogsApi = createApi({
    reducerPath: 'discogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: localForApi }),
    endpoints: (builder) => ({
        search: builder.query({
            query: (searchQuery) => `/api/discogs/database/search?q=${searchQuery}`,
        }),
        artist: builder.query({
            query: (artistId) => `/api/discogs/artists/${artistId}`,
        }),
    }),
});

export const { useSearchQuery, useArtistQuery } = discogsApi;
export default discogsApi.reducer;
