import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showLogin: false,
  user: [],
  Token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showLoginModal: (state, action) => {
      state.showLogin = action.payload;
    },
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
});

export const { showLoginModal, hideLoginModal, SetToken, LoggedInUser } =
  authSlice.actions;
export default authSlice.reducer;
