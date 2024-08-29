import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";
import cartSlice from "./features/CartSlice";
import  authSlice from "./features/AuthSlice";
export const store = configureStore({
  reducer: {
    categoryReducer: categorySlice,
    authSlice,
    cartSlice,
  },
});
