import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
const categoryURL = "http://localhost:4000/api/category";
export const CategoryAPI = createApi({
  reducerPath: "categoryAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: categoryURL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("token", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/get-all-categories",
        method: "GET",
      }),
    }),
    InsertCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/add",
        method: "POST",
        body: newCategory,
      }),
    }),
  }),
});
export const { useGetAllCategoriesQuery, useInsertCategoryMutation } =
  CategoryAPI;
