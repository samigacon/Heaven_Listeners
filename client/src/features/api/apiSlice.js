import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiDiscogs = "https://api.discogs.com/database/"

export const dataApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: apiDiscogs }),
    endpoints: (builder) => ({
        // All Data
        getAllData: builder.query({
            query: () => "data",
        }),
        
        // Register
        
        
        // Login
        
        
        // Logout
        

        
    }),
});

export const { useGetAllDataQuery } = dataApi;