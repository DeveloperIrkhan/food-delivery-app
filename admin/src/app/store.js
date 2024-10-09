import { configureStore } from "@reduxjs/toolkit";
import { FoodAPI } from "./Features/middlewares/FoodsAPI";
import { AuthAPI } from "./Features/middlewares/AuthAPI";
import { CategoryAPI } from "./Features/middlewares/CategoryAPI";
import { OrderAPI } from "./Features/middlewares/OrderAPI";
import OrdersSlice from "./Features/Slices/OrderSlice";
import FoodSlice from "./Features/Slices/FoodsSlice";
import authSlice from "./Features/Slices/AuthSlice";
export const store = configureStore({
  reducer: {
    Order: OrdersSlice,
    food: FoodSlice,
    auth: authSlice,
    [FoodAPI.reducerPath]: FoodAPI.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [OrderAPI.reducerPath]: OrderAPI.reducer,
    [CategoryAPI.reducerPath]: CategoryAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(FoodAPI.middleware)
      .concat(CategoryAPI.middleware)
      .concat(AuthAPI.middleware)
      .concat(OrderAPI.middleware),
});
