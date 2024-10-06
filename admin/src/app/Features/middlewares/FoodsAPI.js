import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
const API_URL = "http://localhost:4000/api/food";
export const FoodAPI = createApi({
  reducerPath: "foodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("token", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    InsertNewFood: builder.mutation({
      query: (newFood) => ({
        url: "/add",
        method: "POSR",
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
  useInsertNewFoodMutation,
  useGetAllFoodQuery,
  useRemoveFoodMutation,
} = FoodAPI;
