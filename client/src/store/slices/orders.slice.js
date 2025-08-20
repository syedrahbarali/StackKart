import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: null,
  reducers: {
    getOrders: (state, action) => {
      state = action.payload;
      return state;
    },
    updateOrder: (state, action) => {
      const { orderId, data } = action.payload;
      return state.map((order) => (order._id === orderId ? data : order));
    },
  },
});

export default orderSlice.reducer;
export const { getOrders, updateOrder } = orderSlice.actions;
