import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';


const baseQuery = fetchBaseQuery({
    baseUrl: 'https://technotes-api.onrender.com',
    credentials: 'include', // !!! чи включати дані про аутентифікацію
    prepareHeaders: (headers, { getState }) => {
        const token = getState().authReducer.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers
    }
})


const baseQueryRefreshToken = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
        console.log('sending refresh token');

        const refreshRes = await baseQuery('/auth/refresh', api, extraOptions);
        console.log(refreshRes)
        if (refreshRes?.data) {

            api.dispatch(setCredentials({ ...refreshRes.data }));

            result = await baseQuery(args, api, extraOptions);

        } else {
            if (refreshRes?.error?.status === 403) {
                refreshRes.error.data.message = "Your login has expired. "
            }
            return refreshRes

        }

    }
    return result
}


export const apiSlice = createApi({
    baseQuery: baseQueryRefreshToken,
    tagTypes: ['Note', 'User'],
    endpoints: (builder) => ({})
})