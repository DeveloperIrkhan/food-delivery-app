import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../../API EndPoints/API_ENDPOINTS";
import axios from "axios";

const initialState = {
  FoodCart: [],
  WishList: [],
  OrderQuantity: 0,
  totalAmount: 0,
  totalItems: 0,
  status: "idel", // idel | loading | success | failed
  error: null,
};

export const fetchingCartItemThunk = createAsyncThunk(
  "cart/fetchingPosts",
  async () => {
    try {
      const token = localStorage.getItem("userToken");
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
      (state.FoodCart = []), (state.totalAmount = 0);
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
      state.FoodCart.push(item);
      state.totalAmount += Number(item.price);
      state.totalItems = state.FoodCart.length;
    },
    IncrementItem: (state, action) => {
      const existingItem = state.FoodCart.find((cartItem) => {
        cartItem._id === action.payload._id;
      });
      if (existingItem) {
        return state.FoodCart.map((cartitem) => {
          if (cartitem._id === existingItem._id) {
            return {
              ...cartitem,
              OrderQuantity: (state.OrderQuantity += 1),
              totalAmount: state.totalAmount + Number(action.payload.price),
            };
          }
          return cartitem;
        });
      }
      // const findIndex = state.FoodCart.findIndex(
      //   (index) => index._id === action.payload._id
      // );

      // if (findIndex >= 0) {
      //   state.FoodCart[findIndex].OrderQuantity += 1;
      //   state.totalAmount += Number(action.payload.price);
      //   state.totalItems = state.FoodCart.length;
      // }
    },
    DecrementItem: (state, action) => {
      const findIndex = state.FoodCart.findIndex(
        (index) => index._id === action.payload._id
      );

      if (findIndex >= 0) {
        if (state.FoodCart[findIndex].OrderQuantity > 1) {
          state.FoodCart[findIndex].OrderQuantity -= 1;
          state.totalAmount -= Number(action.payload.price);
        } else {
          state.FoodCart = state.FoodCart.filter(
            (item) => item._id !== action.payload._id
          );
          state.totalAmount -= Number(action.payload.price);
        }
      }
      state.totalItems = state.FoodCart.length;
    },
  },
  extraReducers: (_builder) => {
    _builder.addCase(fetchingCartItemThunk.pending, (state) => {
      state.status = "loading";
    });
    _builder.addCase(fetchingCartItemThunk.fulfilled, (state, action) => {
      state.FoodCart = action.payload;
      state.status = "succeeded";
    });
    _builder.addCase(fetchingCartItemThunk.rejected, (state, action) => {
      console.log(action.payload)
      state.status = "failed";
      state.error = action.payload.error.message;
    });
  },
});
export const cartAddedItems = (state) => state.UserCart.FoodCart;
export const getStatus = (state) => state.UserCart.status;
export const totalamount = (state) => state.UserCart.totalAmount;
export const totalitems = (state) => state.UserCart.totalItems;
export const { addToCart, IncrementItem, DecrementItem } = UserCart.actions;
export default UserCart.reducer;
