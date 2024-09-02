import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodCategory: [],
  AllFoodItems: [],
};

export const categoryReducer = createSlice({
  name: "categoryReducer",
  initialState,
  reducers: {
    RetriveCategories: (state, action) => {
      state.foodCategory = action.payload;
    },
    RetriveAllFoodItems: (state, action) => {
      state.AllFoodItems = action.payload;
    },
  },
});

export const { RetriveCategories, RetriveAllFoodItems } =
  categoryReducer.actions;
export default categoryReducer.reducer;
