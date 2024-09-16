import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "../../../API EndPoints/API_ENDPOINTS";
const initialState = {
  foodCategory: [],
  AllFoodItems: [],
};
const _categoriesUrl = API_ENDPOINTS.getCategories;
//creating api for fetching all cetogries

export const categoriesAPI = createApi({
  reducerPath: "categoriesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: _categoriesUrl,
  }),

  endpoints: (_builder) => ({
    getCategories: _builder.query({ query: () => "" }),
  }),
});

export const categoryReducer = createSlice({
  name: "categoryReducer",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      categoriesAPI.endpoints.getCategories.matchFulfilled,
      (state, action) => {
        console.log("data is :", action.payload);
        state.foodCategory = action.payload;
      }
    );
  },
});
export const { useGetCategoriesQuery } = categoriesAPI;
export const { RetriveAllFoodItems } = categoryReducer.actions;
export default categoryReducer.reducer;
