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
      // action.payload.forEach(element => {
      //     state.foodCategory.push(element)
      // });
    },
    RetriveAllFoodItems: (state, action) => {
      state.AllFoodItems = action.payload;
      // action.payload.forEach(element => {
      //     state.foodCategory.push(element)
      // });
    },
  },
});

export const { RetriveCategories, RetriveAllFoodItems } =
  categoryReducer.actions;
export default categoryReducer.reducer;
