import { configureStore } from "@reduxjs/toolkit";
import { authSliceActions } from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    auth:authSliceActions
  },
});

export default store;
