import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authAPI } from "./features/middleware/Authmiddleware";
import UserCartReducer from "./features/middleware/userCartMiddleware";
import categoryReducer, {
  categoriesAPI,
} from "./features/gettingCategories and Fooditems/categorySlice";
export const store = configureStore({
  reducer: {
    categoryReducer,
    userAuth: authReducer,
    UserCart: UserCartReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [categoriesAPI.reducerPath]: categoriesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(categoriesAPI.middleware)
      .concat(authAPI.middleware), // Add the middleware
});
