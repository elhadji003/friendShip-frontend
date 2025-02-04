import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:8000/api'; // Remplace par ton URL backend

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ['User'], // Ajout du tag User pour optimiser les requêtes
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: 'register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'], // Rafraîchir les données après inscription
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('token', data.token);
                    dispatch(authAPI.util.invalidateTags(['User']));
                } catch (error) {
                    console.error('Erreur de connexion:', error);
                }
            },
        }),
        getMe: builder.query({
            query: () => 'me',
            providesTags: ['User'],
        }),
        updateProfile: builder.mutation({
            query: (userData) => ({
                url: 'updateProfile',
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
        updateProfileImage: builder.mutation({
            query: (formData) => ({
                url: 'updateProfileImage',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['User'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    localStorage.removeItem('token');
                    dispatch(authAPI.util.invalidateTags(['User']));
                } catch (error) {
                    console.error('Erreur de déconnexion:', error);
                }
            },
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetMeQuery,
    useUpdateProfileMutation,
    useUpdateProfileImageMutation,
    useLogoutMutation,
} = authAPI;
