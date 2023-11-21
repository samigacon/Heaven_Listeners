import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const discogsApi = createApi({
    reducerPath: 'discogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
    endpoints: (builder) => ({
        searchTracks: builder.query({
            query: (searchQuery) => `database/search?q=${searchQuery}`,
        }),
    }),
});

export const { useSearchTracksQuery } = discogsApi;
export default discogsApi.reducer;
