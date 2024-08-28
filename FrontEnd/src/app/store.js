import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";
import cartSlice from "./features/CartSlice";
export const store = configureStore({
  reducer: {
    categoryReducer: categorySlice,
    cartSlice,
  },
});
