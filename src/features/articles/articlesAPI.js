import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:8000/api";

export const articlesAPI = createApi({
    reducerPath: "articlesAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // Récupérer tous les articles
        getArticles: builder.query({
            query: (page = 1) => `/articles?page=${page}`,
        }),

        // Créer un article
        createArticle: builder.mutation({
            query: (articleData) => ({
                url: `/articles`,
                method: "POST",
                body: articleData,
            }),
        }),

        // Récupérer les articles de l'utilisateur
        getMyArticle: builder.query({
            query: (page = 1) => `/user-articles?page=${page}`,
        }),

        // Mettre à jour un article
        updateArticle: builder.mutation({
            query: ({ articleId, updatedData }) => ({
                url: `/articles/${articleId}`,
                method: "PUT",
                body: updatedData,
            }),
        }),

        // Supprimer un article
        deleteArticle: builder.mutation({
            query: (articleId) => ({
                url: `/articles/${articleId}`,
                method: "DELETE",
            }),
        }),

        // Archiver un article
        archiveArticle: builder.mutation({
            query: (articleId) => ({
                url: `/articles/${articleId}/archive`,
                method: "POST",
            }),
        }),

        // Ajouter un like à un article
        likeArticle: builder.mutation({
            query: (articleId) => ({
                url: `/articles/${articleId}/like`,
                method: "POST",
            }),
        }),

        // Ajouter un dislike à un article
        dislikeArticle: builder.mutation({
            query: (articleId) => ({
                url: `/articles/${articleId}/dislike`,
                method: "POST",
            }),
        }),

        // Récupérer les likes d'un article (y compris les utilisateurs qui ont aimé)
        getLikes: builder.query({
            query: (articleId) => `/articles/${articleId}/likes`,
            providesTags: (result, error, articleId) => [{ type: "Likes", id: articleId }],
        }),
        // Ajouter un commentaire à un article
        addComment: builder.mutation({
            query: ({ articleId, commentData }) => ({
                url: `/articles/${articleId}/comments`,
                method: "POST",
                body: commentData,
            }),
        }),

        // Supprimer un commentaire
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `/comments/${commentId}`,
                method: "DELETE",
            }),
        }),

        // Partager un article
        shareArticle: builder.mutation({
            query: ({ articleId, recipientId }) => ({
                url: `/articles/${articleId}/share`,
                method: "POST",
                body: { recipient_id: recipientId },
            }),
        }),

        // Récupérer les articles reçus
        getReceivedArticles: builder.query({
            query: () => "/articles/received",
        }),
    }),
});

export const {
    useGetArticlesQuery,
    useCreateArticleMutation,
    useGetMyArticleQuery,
    useUpdateArticleMutation,
    useDeleteArticleMutation,
    useArchiveArticleMutation,
    useLikeArticleMutation,
    useDislikeArticleMutation,
    useGetLikesQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useShareArticleMutation,
    useGetReceivedArticlesQuery,
} = articlesAPI;