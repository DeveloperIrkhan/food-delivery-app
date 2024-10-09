import { createSlice } from "@reduxjs/toolkit";
import { OrderAPI } from "../middlewares/OrderAPI";

const initialState = {
  Orders: [],
  totalOrders: 0,
  loading: false,
};

export const OrdersSlice = createSlice({
  name: "Order-Slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      OrderAPI.endpoints.GetAllOrders.matchPending,
      (state) => {
        state.loading = true;
      }
    ),
      builder.addMatcher(
        OrderAPI.endpoints.GetAllOrders.matchFulfilled,
        (state, { payload }) => {
          state.Orders = payload.userOrders;
          state.loading = false;
        }
      ),
      builder.addMatcher(
        OrderAPI.endpoints.GetAllOrders.matchRejected,
        (state) => {
          state.loading = false; // Stop loading if request fails
        }
      );
  },
});

export default OrdersSlice.reducer;
