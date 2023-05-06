import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base query to be used with all endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000',
  prepareHeaders: (headers) => {
    // Get the token from the local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Add the token to the headers
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// Create an API slice for authentication endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    // Define the login endpoint
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response) => {
        // Extract the token and user data from the response
        const { token, user } = response;

        // Save the token to local storage
        localStorage.setItem('token', token);

        // Return only the user data
        return user;
      },
    }),

    // Define the sign up endpoint
    signup: builder.mutation({
      query: ({ name, email, password }) => ({
        url: '/users/signup',
        method: 'POST',
        body: { name, email, password },
      }),
      transformResponse: (response) => {
        // Extract the token and user data from the response
        const { token, user } = response;

        // Save the token to local storage
        localStorage.setItem('token', token);

        // Return only the user data
        return user;
      },
    }),

  }),
});

// Export the hooks for each endpoint
export const { useLoginMutation, useSignupMutation} = authApi;


export default authApi;
