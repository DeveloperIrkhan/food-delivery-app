import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BASE_URL, API_ENDPOINTS } from "../../../API EndPoints/API_ENDPOINTS";

export const userCartAPI = createApi({
  reducerPath: "gettingCartItemsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("token", `${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => ({
        url: `${API_ENDPOINTS.GET_ALL_CART_ITEMS}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllItemsQuery } = userCartAPI;
