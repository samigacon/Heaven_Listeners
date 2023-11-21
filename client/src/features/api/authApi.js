import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/authApi" }),
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
               body: { username, password }
            }), 
        }),
        
        // Login
        loginUser: builder.mutation({
            query: ({username, password}) => ({
               url: `/user/login`,
               method: 'POST',
               body: { username, password }
            }), 
        }),
        
        // Logout
        logoutUser: builder.mutation({
            query: () => `/user/logout`,
        }),
        

        
    }),
});

export const { useGetAllDataQuery, useRegisterUserMutation, useLoginUserMutation, } = authApi;
export default authApi.reducer;