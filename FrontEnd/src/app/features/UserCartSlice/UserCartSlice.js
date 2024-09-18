import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../../API EndPoints/API_ENDPOINTS";
import axios from "axios";
import Cookies from "js-cookie";
const initialState = {
  cartItems: [], // adding items into cart
  totalAmount: 0, // total amount of items
  totalItems: 0, // total number of items added to cart
  isLoading: false,
  dbCartItems: [], // user items from database
  status: "idle", // idle | loading | success | failed
  error: null,
};

export const fetchingCartItemThunk = createAsyncThunk(
  "cart/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.log("no token found...");
      }
      const response = await axios.get(API_ENDPOINTS.GET_ALL_CART_ITEMS, {
        headers: {
          token: `${token}`,
        },
      });
      return response.data.cartItems;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch items");
    }
  }
);

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
  extraReducers: (_builder) => {
    _builder.addCase(fetchingCartItemThunk.pending, (state) => {
      state.status = "loading";
      //console.log("status", state.status);
    });
    _builder.addCase(fetchingCartItemThunk.fulfilled, (state, action) => {
      state.dbCartItems = action.payload;
      state.status = "succeeded";
      //console.log("status", state.status);
    });
    _builder.addCase(fetchingCartItemThunk.rejected, (state, action) => {
      state.status = "failed";
      //console.log("status", state.status);
      state.error = action.payload;
    });
  },
});

export const { clearCart, addToCart, IncrementItem, DecrementItem } =
  UserCart.actions;
export const cartItemsFromDb = (state) => state.UserCart.dbCartItems;
export const cartItems = (state) => state.UserCart.cartItems;
export const getStatus = (state) => state.UserCart.status;
export const totalamount = (state) => state.UserCart.totalAmount;
export const totalitems = (state) => state.UserCart.totalItems;
export default UserCart.reducer;
