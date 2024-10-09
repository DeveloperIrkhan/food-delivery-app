import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export const OrderAPI = createApi({
  baseQuery: "",
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/order",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("token", `${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    GetAllOrders: builder.query({
      query: () => ({
        url: "/GetAllOrder",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = OrderAPI;
