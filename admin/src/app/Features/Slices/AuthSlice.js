import { AuthAPI } from "../middlewares/AuthAPI";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  Token: "",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetToken: (state, { payload }) => {
      state.Token = payload;
    },
    LoggedInUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        AuthAPI.endpoints.SignIn.matchFulfilled,
        (state, { payload }) => {
          if (payload.success) {
            state.user = payload;
            localStorage.setItem("user", JSON.stringify(state.user)); // Save user info in localStorage
          }
        }
      )
      .addMatcher(
        AuthAPI.endpoints.SignUp.matchFulfilled,
        (state, { payload }) => {
          if (payload.success) {
            // Update the state with Token and new user data
            state.user = payload;
            localStorage.setItem("user", JSON.stringify(state.user)); // Save user info in localStorage
          }
        }
      )
      .addMatcher(AuthAPI.endpoints.SignIn.matchRejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
      })
      .addMatcher(AuthAPI.endpoints.SignUp.matchRejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
      });
  },
});
export const { SetToken, LoggedInUser } = authSlice.actions;
export const _token = (state) => state.auth.Token;
export const _user = (state) => state.auth.user;
export default authSlice.reducer;
