import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload;
            state.token = accessToken;
            console.log(state.token);
        },
        setLogout: (state, action) => {
            state.token = null;
        }


    }
})

export const { setCredentials, setLogout } = authSlice.actions;
export default authSlice.reducer;


export const tokenSelector = (state) => (state => state.auth.token);
