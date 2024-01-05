import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/ApiSlice"
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch);