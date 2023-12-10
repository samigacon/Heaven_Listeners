import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ReleasesDiscogsApi = createApi({
    reducerPath: 'ReleasesDiscogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.discogs.com/' }),
    endpoints: (builder) => ({
        getTracklist: builder.query({
            query: (masterId) => `/masters/${masterId}`,
        }),
    }),
});

export const { useGetTracklistQuery } = ReleasesDiscogsApi;
export const releasesDiscogsReducer = ReleasesDiscogsApi.reducer;