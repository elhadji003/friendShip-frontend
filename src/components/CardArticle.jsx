import React, { useState, useEffect } from "react";
import { useGetArticlesQuery, useLikeArticleMutation } from "../features/articles/articlesAPI";
import { useGetMeQuery } from "../features/auth/authAPI";
import Pagination from "./Pagination";
import imageDefault from '../assets/user.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"; // Only thumbs up
import LikersList from "./LikersList";
import ArticleSearch from "./ArticleSearch";

const CardArticle = () => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading, refetch } = useGetArticlesQuery(page);
    const { data: user } = useGetMeQuery();
    const [likeArticle] = useLikeArticleMutation();
    const [articles, setArticles] = useState([]);
    const [liked, setLiked] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("Article :", filteredArticles);

    useEffect(() => {
        if (data?.articles) {
            setArticles(data.articles.map(article => ({
                ...article,
                user_like: article.user_like ?? null
            })));
        }

    }, [data]);

    const [refreshLikers, setRefreshLikers] = useState(false);

    const handleLike = async (articleId) => {
        if (!user) return;

        setLiked(articleId);

        setArticles((prevArticles) =>
            prevArticles.map((article) =>
                article.id === articleId
                    ? {
                        ...article,
                        user_like: article.user_like === true ? null : true,
                        likes_count: article.user_like === true ? article.likes_count - 1 : article.likes_count + 1,
                    }
                    : article
            )
        );

        try {
            await likeArticle(articleId).unwrap();
            setRefreshLikers(prev => !prev);
            refetch();
        } catch (error) {
            console.error("Erreur lors du like :", error);
        }
    };

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement des articles</p>;

    return (
        <div className="mt-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <ArticleSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <div className="mt-4">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <div key={article.id} className="mb-4 lg:flex items-center max-sm:shadow-lg max-sm:p-3">
                                <div className="flex flex-col gap-2 w-9/12">
                                    <div className="relative inline-flex self-start gap-3">
                                        <div className={`absolute inset-0 w-8 h-8 rounded-full border-4 ${article.user?.is_connected ? "border-green-500 animate-ping" : "border-red-500"}`}></div>
                                        <img
                                            src={article.user?.profile_image_url || imageDefault}
                                            alt={article.user?.name || "User"}
                                            className="w-8 h-8 rounded-full border bg-white "
                                        />
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold">{article.user?.id === user?.id ? "Moi" : article.user?.name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="shadow p-2 w-full text-gray-500 text-sm">
                                            <p className="font-bold text-gray-900">{article.title}</p>
                                            <span>{article.content}</span>
                                        </div>
                                        <div className="space-x-3 flex">
                                            <button
                                                onClick={() => handleLike(article.id)} // Only handle likes
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
                                        </div>
                                    </div>
                                </div>
                                <div className="w-3/12 flex justify-end max-sm:w-full max-sm:justify-start max-lg:justify-start">
                                    <LikersList articleId={article.id} refreshLikers={refreshLikers} />
                                </div>
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
