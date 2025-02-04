import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice'; // Importe l'action logout depuis ton slice
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8000/api'; // Remplace par ton URL backend

// Fonction pour vérifier si le token est expiré
const isTokenExpired = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convertir en secondes
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true; // Si le token est invalide, considère-le comme expiré
    }
};

// Configuration de baseQuery avec intercepteur
const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// Intercepteur pour gérer les erreurs 401 et rafraîchir le token si nécessaire
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // Vérifier si l'erreur est une 401 (non autorisé)
    if (result.error?.status === 401) {
        const token = localStorage.getItem('token');

        // Vérifier si le token est expiré
        if (token && isTokenExpired(token)) {
            // Déconnecter l'utilisateur
            api.dispatch(logout());
            window.location.href = '/login-register'; // Rediriger vers la page de connexion
        }
    }

    return result;
};

// Création de l'API
export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseQueryWithReauth, // Utiliser le baseQuery personnalisé
    tagTypes: ['User'], // Ajout du tag User pour optimiser les requêtes
    endpoints: (builder) => ({
        // Endpoint pour l'inscription
        register: builder.mutation({
            query: (userData) => ({
                url: 'register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'], // Rafraîchir les données après inscription
        }),

        // Endpoint pour la connexion
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
                    localStorage.setItem('user', JSON.stringify(data.user));
                    dispatch(authAPI.util.invalidateTags(['User']));
                } catch (error) {
                    console.error('Erreur de connexion:', error);
                }
            },
        }),

        // Endpoint pour récupérer les informations de l'utilisateur connecté
        getMe: builder.query({
            query: () => 'me',
            providesTags: ['User'],
        }),

        // Endpoint pour mettre à jour le profil
        updateProfile: builder.mutation({
            query: (userData) => ({
                url: 'updateProfile',
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),

        // Endpoint pour mettre à jour l'image de profil
        updateProfileImage: builder.mutation({
            query: (formData) => ({
                url: 'updateProfileImage',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['User'],
        }),

        // Endpoint pour la déconnexion
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch(authAPI.util.invalidateTags(['User']));
                } catch (error) {
                    console.error('Erreur de déconnexion:', error);
                }
            },
        }),

        // Endpoint pour rafraîchir le token (optionnel)
        refreshToken: builder.mutation({
            query: () => ({
                url: 'refresh-token',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('token', data.token);
                    dispatch(authAPI.util.invalidateTags(['User']));
                } catch (error) {
                    console.error('Erreur lors du rafraîchissement du token:', error);
                }
            },
        }),
    }),
});

// Export des hooks générés par RTK Query
export const {
    useRegisterMutation,
    useLoginMutation,
    useGetMeQuery,
    useUpdateProfileMutation,
    useUpdateProfileImageMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
} = authAPI;