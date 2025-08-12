import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: null,
    reducers: {
        getCartItems: (state,actions) => {
            state = actions.payload;
            return state
        },
        addToCart: (state,actions) => {
            state.push(actions.payload);
            return state
        },
        deleteFromCart: (state,actions) => {
            state = state.filter(item => item._id !== actions.payload._id);
            return state
        },
        updateCartItem: (state,actions) => {
            state = state.map(item => item._id === actions.payload._id ? actions.payload : item);
            return state
        }
    }
})

export default cartSlice.reducer;
export const { getCartItems, addToCart, deleteFromCart, updateCartItem } = cartSlice.actions;