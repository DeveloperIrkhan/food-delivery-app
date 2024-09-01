import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { FoodZ_API_For_admin } from "./Features/apiSlice";
import CategorySlice from "./Features/CategortySlice";
export const store = configureStore({
  reducer: {
    CategorySlice,
    [FoodZ_API_For_admin.reducerPath]: FoodZ_API_For_admin.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(FoodZ_API_For_admin.middleware),
});
