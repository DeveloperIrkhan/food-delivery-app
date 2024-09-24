import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const initialState = {
  foodCategory: [],
  AllFoodItems: [],
  isLoading: false,
  error:""
};

//creating api for fetching all cetogries

export const categoriesAPI = createApi({
  reducerPath: "categoriesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
  }),

  endpoints: (_builder) => ({
    getCategories: _builder.query({
      query: () => ({
        url: "/category/get-all-categories",
        method: "GET",
      }),
    }),
    getFoods: _builder.query({
      query: () => ({
        url: "/food/getAllFood",
        method: "GET",
      }),
    }),
  }),
});

export const categoryReducer = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        categoriesAPI.endpoints.getCategories.matchFulfilled,
        (state, action) => {
          if (action.payload) {
            state.isLoading = false;
            state.foodCategory = action.payload;
          }
        }
      )
      .addMatcher(
        categoriesAPI.endpoints.getCategories.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        categoriesAPI.endpoints.getCategories.matchRejected,
        (state,{ payload }) => {
          state.isLoading = true;
          state.error = payload.error || "error"
        }
      )
      .addMatcher(
        categoriesAPI.endpoints.getFoods.matchFulfilled,
        (state, { payload }) => {
          if (payload) {
            state.AllFoodItems = payload;
          }
        }
      );
  },
});
export const { useGetCategoriesQuery, useGetFoodsQuery } = categoriesAPI;
export const _isLoading = (state) => state.categoryReducer.isLoading;
// export const _isLoading = (state) => state.isLoading;
export default categoryReducer.reducer;
