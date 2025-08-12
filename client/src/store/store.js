import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import productSlice from "./slices/product.slice";
import cartSlice from "./slices/cart.slice";

const store = configureStore({
  reducer: {
    auth:authSlice,
    product: productSlice,
    cart: cartSlice
  },
});

export default store;
