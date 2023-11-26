import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = 'https://api.discogs.com'

export const discogsApi = createApi({
    reducerPath: 'discogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: api }),
    endpoints: (builder) => ({
        search: builder.query({
            // With Consumer and Secret Key
            query: (searchQuery) => `database/search?q=${searchQuery}&key=kzwaXswmrokVpsgrxEdm&secret=oRraKrTFCIotmweTGYgAaMarsdFVwIFA`,
        }),
    }),
});

export const { useSearchQuery } = discogsApi;
export default discogsApi.reducer;
