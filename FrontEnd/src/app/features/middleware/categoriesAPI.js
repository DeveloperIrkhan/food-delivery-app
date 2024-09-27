import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
export const { useGetCategoriesQuery, useGetFoodsQuery } = categoriesAPI;
