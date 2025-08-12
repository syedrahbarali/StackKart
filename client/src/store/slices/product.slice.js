import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    getProducts: (state, actions) => {
      state.products = actions.payload;
      return state;
    },
  },
});

export default productSlice.reducer;
export const { getProducts } = productSlice.actions;
