import React, { useState } from "react";
import { useGetMyArticleQuery } from "../../features/articles/articlesAPI";
import imageDefault from '../../assets/user.png'


const MesArticles = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetMyArticleQuery(page);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="border-t-4 border-gray-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
            </div>
        );
    }

    if (isError || !data) {
        return <p className="text-red-500">Article non disponible</p>;
    }

    return (
        <div className="bg-white text-black rounded-lg shadow-md p-6 mb-4">
            {
                isLoading ? (
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="border-t-4 border-gray-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
                    </div>
                ) : (
                    data.articles.length > 0 ? (
                        data.articles.map((art) => (
                            <div key={art.id} className="border-b pb-4 mb-4">
                                <img
                                    src={art.profile_image_url || imageDefault}
                                    alt={art.title || "Image indisponible"}
                                    className="w-8 h-8 rounded-full border border-gray-400 object-cover rounded-md mb-4"
                                />
                                <h2 className="text-xl text-gray-500 font-bold mb-2">{art.title}</h2>
                                <p className="text-gray-700 mb-4">{art.content}</p>
                                <p className="text-sm text-gray-500">
                                    Publié par {art.user?.name ? "Moi" : ""}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Aucun article disponible</p>
                    )
                )
            }

            {/* Pagination */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                >
                    Précédent
                </button>

                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={data.articles.length < data.per_page}
                    className={`px-4 py-2 rounded-md ${data.articles.length < data.per_page ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default MesArticles;
