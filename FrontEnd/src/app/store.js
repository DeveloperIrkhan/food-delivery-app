import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/slices/userAuth";
import UserCart from "./features/slices/userCartSlice";
import { authAPI } from "./features/middleware/Authmiddleware";
import { userCartAPI } from "./features/middleware/userCartAPI";
import categoryReducer from "./features/slices/categorySlice";
import { categoriesAPI } from "./features/middleware/categoriesAPI";
export const store = configureStore({
  reducer: {
    categoryReducer,
    userAuth: authReducer,
    UserCart,
    [authAPI.reducerPath]: authAPI.reducer,
    [categoriesAPI.reducerPath]: categoriesAPI.reducer,
    [userCartAPI.reducerPath]: userCartAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(categoriesAPI.middleware)
      .concat(userCartAPI.middleware)
      .concat(authAPI.middleware), // Add the middleware
});
