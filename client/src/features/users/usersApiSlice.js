import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/ApiSlice";


const usersAdapter = createEntityAdapter({});


const initialState = usersAdapter.getInitialState();


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (data) => {
                const loadedUsers = data.map(user => {
                    user.id = user._id
                    return user
                })
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, err, args) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: "LIST" },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]

                } else return [{ type: 'User', id: "LIST" }]
            }

        }),
        addNewUser: builder.mutation({
            query: (body) => ({
                url: '/users',
                method: 'POST',
                body: { ...body },
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: `/users`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result, error, arg) =>
                [{ type: 'User', id: arg.id }]

        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: "/users",
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: (res, error, arg) =>
                [{ type: 'User', id: arg.id }]
        })
    })
})


export const { useGetUsersQuery, useAddNewUserMutation, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice;


export const selectUserResult = usersApiSlice.endpoints.getUsers.select();


const selectUserData = createSelector(
    selectUserResult,
    userResult => userResult.data // userResult приймає результат функції selectUserResult

)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState)