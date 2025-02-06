import React, { useState, useEffect } from "react";
import { useGetArticlesQuery, useLikeArticleMutation, useDislikeArticleMutation } from "../features/articles/articlesAPI";
import { useGetMeQuery } from "../features/auth/authAPI";
import Pagination from "./Pagination";
import imageDefault from '../assets/user.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import LikersList from "./LikersList";
import { useParams } from "react-router-dom"; // Import useParams

const CardArticle = () => {
    const { articleId } = useParams(); // Correct usage of useParams
    const [page, setPage] = useState(1);
    const { data, error, isLoading, refetch } = useGetArticlesQuery(page);
    const { data: user } = useGetMeQuery();
    const [likeArticle] = useLikeArticleMutation();
    const [dislikeArticle] = useDislikeArticleMutation();
    const [articles, setArticles] = useState([]);
    const [liked, setLiked] = useState(null);
    const [disliked, setDisliked] = useState(null);

    useEffect(() => {
        if (data?.articles) {
            setArticles(data.articles.map(article => ({
                ...article,
                user_like: article.user_like ?? null
            })));
        }
    }, [data]);

    const handleReaction = async (articleId, action) => {
        if (!user) return;

        // Ajout de l'animation de scale lors du clic
        if (action === "like") setLiked(articleId);
        if (action === "dislike") setDisliked(articleId);

        setArticles((prevArticles) =>
            prevArticles.map((article) =>
                article.id === articleId
                    ? {
                        ...article,
                        user_like: action === "like" ? true : action === "dislike" ? false : article.user_like,
                        likes_count: action === "like" ? article.likes_count + 1 : article.likes_count - 1,
                        dislikes_count: action === "dislike" ? article.dislikes_count + 1 : article.dislikes_count - 1,
                    }
                    : article
            )
        );

        try {
            action === "like" ? await likeArticle(articleId).unwrap() : await dislikeArticle(articleId).unwrap();
            refetch();
        } catch (error) {
            console.error(`Erreur lors du ${action} :`, error);
        }
    };

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement des articles</p>;

    return (
        <div className="mt-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-center font-bold text-lg">Les Articles</h3>
                <div className="mt-4">
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <div key={article.id} className="mb-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={article.user?.profile_image_url || imageDefault}
                                        alt={article.user?.name || "User"}
                                        className="w-8 h-8 rounded-full border"
                                    />
                                    <div>
                                        <span className="font-semibold">{article.user?.id === user?.id ? "Moi" : article.user?.name}</span>
                                        <div className="shadow p-2 text-gray-500 text-sm">
                                            <p className="font-bold text-gray-900">{article.title}</p>
                                            <span>{article.content}</span>
                                        </div>
                                        <div className="space-x-3 flex">
                                            <button
                                                onClick={() => handleReaction(article.id, "like")}
                                                className={`transform transition-transform duration-200 ${liked === article.id ? "hover:scale-110" : ""}`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faThumbsUp}
                                                    className={
                                                        article.likes_count === 0
                                                            ? "text-gray-300 hover:text-blue-500"
                                                            : article.user_like === true
                                                                ? "text-blue-500"
                                                                : "text-gray-300"
                                                    }
                                                />
                                                <span className="ml-1">({article.likes_count})</span>
                                            </button>
                                            <button
                                                onClick={() => handleReaction(article.id, "dislike")}
                                                className={`transform transition-transform duration-200 ${disliked === article.id ? "hover:scale-110" : ""}`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faThumbsDown}
                                                    className={
                                                        article.dislikes_count === 0
                                                            ? "text-gray-300 hover:text-red-500"
                                                            : article.user_like === false
                                                                ? "text-gray-300"
                                                                : "text-red-500"
                                                    }
                                                />
                                                <span className="ml-1">({article.dislikes_count})</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <LikersList articleId={article.id} />
                            </div>
                        ))
                    ) : (
                        <p>Aucun article trouvé.</p>
                    )}
                    <Pagination page={page} setPage={setPage} hasMore={articles.length >= data?.per_page} />
                </div>
            </div>
        </div>
    );
};

export default CardArticle;
