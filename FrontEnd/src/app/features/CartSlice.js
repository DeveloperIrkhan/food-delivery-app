import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //clearing cart
    clearCart: (state) => {
      (state.cartItems = []), (state.totalAmount = 0);
      state.totalItems = 0;
    },

    //adding items to the cart
    addToCart: (state, action) => {
      const item = {
        _id: action.payload._id,
        name: action.payload.name,
        price: action.payload.price,
        description: action.payload.description,
        image: action.payload.image,
        OrderQuantity: 1,
      };
      state.cartItems.push(item);
      state.totalAmount += Number(item.price);
      state.totalItems = state.cartItems.length;
    },
    IncrementItem: (state, action) => {
      const findIndex = state.cartItems.findIndex(
        (index) => index._id === action.payload._id
      );

      if (findIndex >= 0) {
        state.cartItems[findIndex].OrderQuantity += 1;
        state.totalAmount += Number(action.payload.price);
        state.totalItems = state.cartItems.length;
      }
    },
    DecrementItem: (state, action) => {
      const findIndex = state.cartItems.findIndex(
        (index) => index._id === action.payload._id
      );

      if (findIndex >= 0) {
        if (state.cartItems[findIndex].OrderQuantity > 1) {
          state.cartItems[findIndex].OrderQuantity -= 1;
          state.totalAmount -= Number(action.payload.price);
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload._id
          );
          state.totalAmount -= Number(action.payload.price);
        }
      }
      state.totalItems = state.cartItems.length;
    },
  },
});

export const { clearCart, addToCart, IncrementItem, DecrementItem } =
  cartSlice.actions;
export default cartSlice.reducer;
