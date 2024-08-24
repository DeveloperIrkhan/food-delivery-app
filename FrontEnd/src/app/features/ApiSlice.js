import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = "https://dummyjson.com";

export const ProductAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    getOneProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery } = ProductAPI;
