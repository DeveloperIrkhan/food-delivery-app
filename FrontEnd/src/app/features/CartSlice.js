import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const APIURL = "http://localhost:4000/api/";
export const fetchCartData = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.log("no token found...");
      }

      await axios.get(APIURL + "cart/GetAllCartItems", {
        headers: {
          token: `${token}`,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
export const AddCartData = createAsyncThunk(
  "cart/addCartItems",
  async ({ itemId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.log("No token found...");
        return rejectWithValue("No token found");
      }

      const response = await axios.post(
        `${APIURL}cart/AddtoCart`,
        { itemId },
        {
          headers: {
            token: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  cartItems: [],
  dbCartItems: [],
  totalAmount: 0,
  totalItems: 0,
  isLoading: false,
  status: "idle",
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
  extraReducers: (builder) => {
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      state.dbCartItems = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchCartData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCartData.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "rejected";
    });
  },
});

export const { clearCart, addToCart, IncrementItem, DecrementItem } =
  cartSlice.actions;
export default cartSlice.reducer;
