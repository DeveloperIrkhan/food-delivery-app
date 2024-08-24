import { configureStore } from "@reduxjs/toolkit";
import { ProductAPI } from "./features/ApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import shopingCartSlice from './features/Shoping Cart/ShopingCartSlice'
export const store = configureStore({
  reducer: {
    [ProductAPI.reducerPath]: ProductAPI.reducer,
    shopingCartSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductAPI.middleware), 
});

setupListeners(store.dispatch);
