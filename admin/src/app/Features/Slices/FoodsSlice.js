import { createSlice } from "@reduxjs/toolkit";
import { FoodAPI } from "../middlewares/FoodsAPI";
const initialState = {
  categoriesItems: [],
  error: "",
};
const CategorySlice = createSlice({
  name: "category-slice",
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

export default CategorySlice.reducer;
