import { createSlice } from "@reduxjs/toolkit";
import { userCartAPI } from "../middleware/userCartAPI";
const initialState = {
  cartItems: [], // adding items into cart
  totalAmount: 0, // total amount of items
  totalItems: 0, // total number of items added to cart
  isLoading: false,
  dbCartItems: [], // user items from database
  error: null,
};
export const UserCart = createSlice({
  name: "food-cart",
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userCartAPI.endpoints.getAllItems.matchFulfilled,
        (state, action) => {
          state.cartItems = action.payload.cartItems;
          console.log("data from db",state.cartItems);
          state.isLoading = false;
        }
      )
      .addMatcher(userCartAPI.endpoints.getAllItems.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        userCartAPI.endpoints.getAllItems.matchRejected,
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload || "error while getting cart items";
        }
      );
  },
});

export const cartItemsFromDb = (state) => state.UserCart.dbCartItems;
export const cartItems = (state) => state.UserCart.cartItems;
export const getStatus = (state) => state.UserCart.status;
export const totalamount = (state) => state.UserCart.totalAmount;
export const totalitems = (state) => state.UserCart.totalItems;
export const { clearCart, addToCart, IncrementItem, DecrementItem } =
  UserCart.actions;
export default UserCart.reducer;
