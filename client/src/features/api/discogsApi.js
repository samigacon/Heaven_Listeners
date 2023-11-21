import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const discogsApi = createApi({
    reducerPath: 'discogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.discogs.com/" }),
    endpoints: (builder) => ({
        searchTracks: builder.query({
            query: (searchQuery) => `database/search?q=${searchQuery}&type=track`,
        }),
    }),
});

export const { useSearchTracksQuery } = discogsApi;
export default discogsApi.reducer;
