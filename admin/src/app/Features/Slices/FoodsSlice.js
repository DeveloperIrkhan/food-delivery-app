import { createSlice } from "@reduxjs/toolkit";
import { FoodAPI } from "../middlewares/FoodsAPI";
const initialState = {
  categoriesItems: [],
  error: "",
};
const FoodSlice = createSlice({
  name: "food-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      FoodAPI.endpoints.InsertNewFood.matchRejected,
      (state, { payload }) => {
        state.error = payload.message;
      },
      FoodAPI.endpoints.InsertNewFood.matchFulfilled,
      (state, action) => {
        state.categoriesItems = action.payload.categoriesItems;
      }
    );
  },
});

export default FoodSlice.reducer;
