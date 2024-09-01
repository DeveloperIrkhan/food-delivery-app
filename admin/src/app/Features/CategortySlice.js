import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoriesItems: [],
};
export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getAllCategories: (state, action) => {
      state.categoriesItems = action.payload.categoriesItems;
    },
  },
});

export const { getAllCategories } = CategorySlice.actions;
export default CategorySlice.reducer;
