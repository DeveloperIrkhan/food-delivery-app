import { configureStore } from "@reduxjs/toolkit";
import { FoodAPI } from "./Features/middlewares/FoodsAPI";
import { AuthAPI } from "./Features/middlewares/AuthAPI";
import { CategoryAPI } from "./Features/middlewares/CategoryAPI";
import FoodSlice from "./Features/Slices/FoodsSlice";
import authSlice from "./Features/Slices/AuthSlice";
export const store = configureStore({
  reducer: {
    food: FoodSlice,
    auth: authSlice,
    [FoodAPI.reducerPath]: FoodAPI.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [CategoryAPI.reducerPath]: CategoryAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(FoodAPI.middleware)
      .concat(CategoryAPI.middleware)
      .concat(AuthAPI.middleware),
});
