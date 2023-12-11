import { apiSlice } from "../../app/api/ApiSlice"
import { setLogout } from "./authSlice"

export const authApiSlcie = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logIn: builder.mutation({
            query: data => ({
                url: '/auth',
                method: 'POST',
                body: { ...data }
            })
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setLogout());
                    dispatch(apiSlice.util.resetApiState());
                } catch (err) {
                    console.log(err);
                }
            }

        }),
        refresh: builder.query({
            query: () => '/auth/refresh',
        })
    })
})

export const { useLogInMutation, useLogOutMutation, } = authApiSlcie;

