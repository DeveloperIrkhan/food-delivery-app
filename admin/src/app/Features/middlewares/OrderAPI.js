import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export const OrderAPI = createApi({
  baseQuery: "",
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/order",
    //       http://localhost:4000/api/order/UpdateStatus
    //       http://localhost:4000/api/order/Update-Status
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
    UpdateStatus: builder.mutation({
      query: ({ OrderId, Status }) => ({
        url: "/Update-Status",
        method: "POST",
        body: { OrderId, Status },
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useUpdateStatusMutation } = OrderAPI;
