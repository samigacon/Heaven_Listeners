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
        registerUser: builder.mutation({
            query: ({username, password}) => ({
               url: `/user/register`,
               method: 'POST',
               body: {username, password}
            }), 
        }),
        
        // Login
        loginUser: builder.mutation({
            query: ({username, password}) => ({
               url: `/user/login`,
               method: 'POST',
               body: {username, password}
            }), 
        }),
        
        // Logout
        logoutUser: builder.mutation({
            query: () => `/user/logout`,
        }),
        

        
    }),
});

export const { useGetAllDataQuery } = dataApi;