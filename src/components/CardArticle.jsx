import React, { useState } from "react";
import { useGetArticlesQuery } from "../features/articles/articlesAPI";
import { useGetMeQuery } from "../features/auth/authAPI"
import Pagination from "./Pagination";
import imageDefault from '../assets/user.png';
import LikersList from "./LikersList";

const CardArticle = () => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useGetArticlesQuery(page); // Utilisation de la page dynamique
    const { data: user } = useGetMeQuery()
    console.log("Mes articles :", data);

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement des articles</p>;

    return (
        <div className="mt-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-center font-bold text-lg md:text-xl lg:text-2xl">Les Articles</h3>
                <div className="mt-4">
                    {data?.articles?.map((article) => (
                        <div key={article.id} className="mb-4 flex justify-between">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={article.user?.profile_image_url || imageDefault}
                                    alt={article.user?.name || "User"}
                                    className="flex self-start w-8 h-8 rounded-full border border-gray-500"
                                />
                                <div>
                                    <span className="font-semibold">
                                        {article.user?.id === user?.id ? "Moi" : article.user?.name}
                                    </span>
                                    <div className="shadow p-2 text-gray-500 text-sm">
                                        <p className="font-bold text-gray-900 text-sm">{article.title}</p>
                                        <span>{article.content}</span>
                                    </div>
                                    <span> like (1) </span>
                                    <span> dislike (1) </span>
                                </div>
                            </div>
                            <LikersList />
                        </div>
                    ))}
                    <Pagination page={page} setPage={setPage} hasMore={data?.articles?.length >= data.per_page} />
                </div>
            </div>
        </div>
    );
};

export default CardArticle;
