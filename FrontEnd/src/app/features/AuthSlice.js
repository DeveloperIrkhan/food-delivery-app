import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showLogin: false,
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
  },
});

export const { showLoginModal, hideLoginModal } = authSlice.actions;
export default authSlice.reducer;
