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
    addToCart: builder.mutation({
      query: (cartitem) => ({
        url: `${API_ENDPOINTS.CART_ADD_ITEM}`,
        method: "POST",
        body: { itemId: cartitem._id },
      }),
    }),
    removeFromCart: builder.mutation({
      query: (cartitem) => ({
        url: `${API_ENDPOINTS.CART_REMOVE_ITEM}`,
        method: "DELETE",
        body: { itemId: cartitem._id },
      }),
    }),
  }),
});
export const {
  useGetAllItemsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = userCartAPI;
