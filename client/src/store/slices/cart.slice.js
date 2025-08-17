import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    getCartItems: (state, action) => {
      return action.payload || [];
    },

    addToCartProduct: (state, action) => {
      const { product, quantity = 1 } = action.payload;

      const existingItemIndex = state.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += quantity;
      } else {
        state.push({ product, quantity });
      }
    },

    updateProductItemQuantity: (state, action) => {
      const { itemId, quantityChange } = action.payload; // ✅ renamed for clarity
      const itemIndex = state.findIndex((item) => item.product._id === itemId);

      if (itemIndex !== -1) {
        const newQuantity = state[itemIndex].quantity + quantityChange;

        if (newQuantity <= 0) {
          state.splice(itemIndex, 1);
        } else {
          state[itemIndex].quantity = newQuantity;
        }
      }
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      return state.filter((item) => item.product._id !== itemId);
    },

    updateCartItem: (state, action) => {
      const { itemId, updates } = action.payload;
      const itemIndex = state.findIndex((item) => item.product._id === itemId);

      if (itemIndex !== -1) {
        state[itemIndex] = { ...state[itemIndex], ...updates };
      }
    },

    clearCart: () => {
      return [];
    },
  },
});

export default cartSlice.reducer;
export const {
  getCartItems,
  addToCartProduct,
  updateProductItemQuantity,
  removeFromCart,
  updateCartItem,
  clearCart,
} = cartSlice.actions;
