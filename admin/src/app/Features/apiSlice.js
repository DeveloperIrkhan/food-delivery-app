import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:4000/api/food";

export const FoodZ_API_For_admin = createApi({
  reducerPath: "FoodAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    InsertNewFood: builder.mutation({
      query: (newFood) => ({
        url: "/add",
        method: "POST",
        body: newFood,
      }),
    }),
    getAllFood: builder.query({
      query: () => "/getAllFood",
    }),
    removeFood: builder.mutation({
      query: (id) => ({
        url: `/remove/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllFoodQuery,
  useRemoveFoodMutation,
  useInsertNewFoodMutation,
} = FoodZ_API_For_admin;
