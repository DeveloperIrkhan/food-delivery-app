import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authAPI } from "./features/middleware/Authmiddleware";
import UserCart from "./features/uerCartSlice/userCartSlice";
import { userCartAPI } from "./features/middleware/cartAPIMiddleware/userCartAPI";
import categoryReducer, {
  categoriesAPI,
} from "./features/categoriesSlice/categorySlice";
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
