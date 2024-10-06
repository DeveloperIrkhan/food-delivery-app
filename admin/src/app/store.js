import { configureStore } from "@reduxjs/toolkit";
import { FoodAPI } from "./Features/middlewares/FoodsAPI";
import { AuthAPI } from "./Features/middlewares/AuthAPI";
import CategorySlice from "./Features/Slices/FoodsSlice";
import authSlice from "./Features/Slices/AuthSlice";
export const store = configureStore({
  reducer: {
    category: CategorySlice,
    auth: authSlice,
    [FoodAPI.reducerPath]: FoodAPI.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(FoodAPI.middleware)
      .concat(AuthAPI.middleware),
});
