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
            query: () => `/articles`,
        }),

        // Créer un article
        createArticle: builder.mutation({
            query: (articleData) => ({
                url: `/articles`,
                method: "POST",
                body: articleData,
            }),
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

        // Supprimer un like d'un article
        unlikeArticle: builder.mutation({
            query: (articleId) => ({
                url: `/articles/${articleId}/like`,
                method: "DELETE",
            }),
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

        // Recevoir
        getReceivedArticles: builder.query({
            query: () => "/articles/received",
        }),
    }),
});

export const {
    useGetArticlesQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation,
    useArchiveArticleMutation,
    useLikeArticleMutation,
    useUnlikeArticleMutation,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useShareArticleMutation,
    useGetReceivedArticlesQuery,
} = articlesAPI;
