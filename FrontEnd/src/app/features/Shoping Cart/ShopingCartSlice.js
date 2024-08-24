import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  totalAmount: 0.0,
};

export const shopingCartSlice = createSlice({
  name: "shopingcart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    AddtoCart: (state, action) => {
      //   const cartItem = state.cartItems.find(
      //     (item) => item.id === action.payload
      //   );
      //   cartItem.amount = cartItem.amount + 1;

      state.cartItems.push(action.payload);
      state.totalAmount =
        Math.trunc(state.totalAmount) + Math.trunc(action.payload.price);
    },

    RemoveFromCart: (state, action) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id != itemId);
      state.totalAmount =
        Math.trunc(state.totalAmount) - Math.trunc(action.payload.price);
    },
  },
});

export const { AddtoCart, RemoveFromCart } = shopingCartSlice.actions;
export default shopingCartSlice.reducer;
