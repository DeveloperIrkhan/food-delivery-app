import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const initialState = {
  foodCategory: [],
  AllFoodItems: [],
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
  name: "categoryReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        categoriesAPI.endpoints.getCategories.matchFulfilled,
        (state, action) => {
          if (action.payload) {
            state.foodCategory = action.payload;
          }
        }
      )
      .addMatcher(categoriesAPI.endpoints.getFoods.matchPending, () => {
        console.log("loading data is fetching");
      })
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
export default categoryReducer.reducer;
