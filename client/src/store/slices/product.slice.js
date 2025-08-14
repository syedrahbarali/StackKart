import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: null,
  reducers: {
    getProducts: (state, actions) => {
      state = actions.payload;
      return state;
    },
  },
});

export default productSlice.reducer;
export const { getProducts } = productSlice.actions;
