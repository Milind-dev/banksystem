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
    sessions: null,
    profile: null,
    username: null,
    role: null,
    userId: null

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
            state.tokens = action.payload.data.tokens || null
        },
        setVerifyotp: (state, action) => {
            state.isVerified = true;
            state.tokens = action.payload || null;
            state.sessions = action.payload || null;
            state.profile = action.payload || null;
        },
        setRegister: (state, action) => {
            state.register = action.payload;
            state.isLoggedIn = false; // registration ≠ login
        },
        setprofile: (state, action) => {
            state.profileimg = action.payload || null;
        },
        setadminprofile: (state, action) => {
            state.decodeadmintoken = action.payload || null
        }

    },
});

export const { setUser, setLoginUser, setRegister, setVerifyotp, setprofile, setadminprofile } = authSlice.actions;

export default authSlice.reducer;
