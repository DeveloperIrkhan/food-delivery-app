import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_ENDPOINTS } from "../../../API EndPoints/API_ENDPOINTS";
const _baseUrl = API_ENDPOINTS.userAuth;

export const authAPI = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: _baseUrl,
    credentials: "include",
  }),

  endpoints: (_builder) => ({
    signIn: _builder.mutation({
      query: (credentials) => ({
        url: "/Signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: _builder.mutation({
      query: (credentials) => ({
        url: "/Signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authAPI;
