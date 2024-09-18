import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authAPI } from "./features/UserAuth/AuthSlice";
import UserCartReducer from "./features/UserCartSlice/UserCartSlice";
import categorySlice, {
  categoriesAPI,
} from "./features/gettingCategories and Fooditems/categorySlice";
export const store = configureStore({
  reducer: {
    categoryReducer: categorySlice,
    auth: authReducer,
    UserCart: UserCartReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [categoriesAPI.reducerPath]: categoriesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authAPI.middleware)
      .concat(categoriesAPI.middleware), // Add the middleware
});
