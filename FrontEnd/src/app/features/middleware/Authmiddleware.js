import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../../API EndPoints/API_ENDPOINTS";
const _baseUrl = API_ENDPOINTS.userAuth;

//defining base url
const initialState = {
  showLogin: false, // to control loginModal
  user: [], // User object with details like name, email, etc.
  Token: "", // JWT token for authentication
  error: "",
};

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
export const userAuth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer to show the login modal
    showLoginModal: (state, action) => {
      console.log("action.payload", action.payload);
      console.log("Dispatched payload to show modal:", action.payload);
      state.showLogin = action.payload;
      console.log("showLogin", state.showLogin);
    },
    // Reducer to hide the login modal
    hideLoginModal: (state, action) => {
      state.showLogin = action.payload;
    },
    SetToken: (state, action) => {
      state.Token = action.payload;
    },
    LoggedInUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    //handeling success response for signin
    builder
      .addMatcher(
        authAPI.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          if (payload.success) {
            // Update the state with token and user data
            state.user = {
              name: payload.exsistingUser.name,
              email: payload.exsistingUser.email,
              image: payload.exsistingUser.image,
              userRole: payload.exsistingUser.userRole,
            };
            // Save token and user info in localStorage
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      )
      //handle the success response for signup
      .addMatcher(
        authAPI.endpoints.signUp.matchFulfilled,
        (state, { payload }) => {
          if (payload.success) {
            // Update the state with token and new user data
            state.user = {
              name: payload.user.name,
              email: payload.user.email,
              image: payload.user.image,
              userRole: payload.user.Role,
            };
            // Save token and user info in localStorage
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      )
      .addMatcher(authAPI.endpoints.signIn.matchRejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
      })
      .addMatcher(authAPI.endpoints.signUp.matchRejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
      });
  },
});

// Export hooks for making API calls
export const { useSignInMutation, useSignUpMutation } = authAPI;
// Export actions for showing/hiding the login modal
export const { showLoginModal, hideLoginModal, SetToken, LoggedInUser } =
  userAuth.actions;
export const _loginModal = (state) => state.userAuth.showLogin;
export const _token = (state) => state.userAuth.Token;
export const _user = (state) => state.userAuth.user;
export default userAuth.reducer;
