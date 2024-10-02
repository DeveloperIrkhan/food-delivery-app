import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderAPI } from "../middleware/Ordermiddleware";
const initialState = {
  Orders: [],
  totalOrders: 0,
  loading: false,
};
export const OrderSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      fetchOrderAPI.endpoints.getAllOrders.matchPending,
      (staate) => {
        staate.loading = true;
      },
      fetchOrderAPI.endpoints.getAllOrders.matchFulfilled,
      (state, { payload }) => {
        console.log("action.payload", payload);
        state.Orders = payload.userOrders;
        state.loading = false;
        state.totalOrders = payload.totalOrders;
      },
      builder.addMatcher(
        fetchOrderAPI.endpoints.getAllOrders.matchRejected,
        (state) => {
          state.loading = false; // Stop loading if request fails
        }
      )
    );
  },
});

export default OrderSlice.reducer;
