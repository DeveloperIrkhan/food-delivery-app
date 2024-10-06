import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiURL = "http://localhost:4000/api/userauth";
export const AuthAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiURL}`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    SignIn: builder.mutation({
      query: (credentials) => ({
        url: "/Signin",
        method: "POST",
        body: credentials,
      }),
    }),
    SignUp: builder.mutation({
      query: (credentials) => ({
        url: "/Signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = AuthAPI;
