import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: false
    },
    reducers: {
        login: (state, actions) => {
            state.user = actions.payload;
            state.status = true

            return state;
        },
        logout: (state) => {
            state.user = null;
            state.status = false;

            return state;
        }
    }
})

export default authSlice;
export const authSliceActions = authSlice.actions;