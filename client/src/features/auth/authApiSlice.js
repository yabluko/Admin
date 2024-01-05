import { apiSlice } from "../../app/api/ApiSlice"
import { setCredentials, setLogout } from "./authSlice"

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
                    console.log(data);
                    dispatch(setLogout());
                    // setTimeout(() => {
                    //     dispatch(apiSlice.util.resetApiState());

                    // }, 1000)

                } catch (err) {
                    console.log(err);
                }
            }

        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))

                } catch (err) {
                    console.log(err)
                }
            }
        }),

    })
})

export const { useLogInMutation, useLogOutMutation, useRefreshMutation } = authApiSlcie;

