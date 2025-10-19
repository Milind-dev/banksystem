// store/exampleSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    isLoggedIn: false,
    user: null, // { id: number, role: string, email: string }
    tokens: null, // { accessToken: string, refreshToken: string }
    permissions: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoginUser: (state, action) => {
            state.login = action.payload;
        },

    },
});

export const { setUser, setLoginUser } = authSlice.actions;

export default authSlice.reducer;
