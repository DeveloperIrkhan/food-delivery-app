import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodCategory: [],
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
  },
});

export const { RetriveCategories } = categoryReducer.actions;
export default categoryReducer.reducer;
