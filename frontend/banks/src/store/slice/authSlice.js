// // store/exampleSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// // Initial state
// const initialState = {
//     isLoggedIn: false,
//     user: null, // { id: number, role: string, email: string }
//     tokens: null, // { accessToken: string, refreshToken: string }
//     permissions: [],
//     register: null,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             state.user = action.payload;
//         },
//         setLoginUser: (state, action) => {
//             state.login = action.payload;
//             state.isLoggedIn = !!action.payload;


//         },
//         setRegister: (state, action) => {
//             state.register = action.payload;
//             // state.isLoggedIn = false; // auto-login after register
//             state.isLoggedIn = false; // Always false after registration
//         }
//     },
// });

// export const { setUser, setLoginUser, setRegister } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
    tokens: null,
    permissions: [],
    register: null,
    login: null,
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
            state.isLoggedIn = !!action.payload;
        },
        setRegister: (state, action) => {
            state.register = action.payload;
            state.isLoggedIn = false; // registration ≠ login
        },
    },
});

export const { setUser, setLoginUser, setRegister } = authSlice.actions;

export default authSlice.reducer;
