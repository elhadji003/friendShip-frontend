import React from "react";
import ShareArticleButton from "./ShareArticleButton";

const Card = ({ article }) => {
    if (!article) {
        return <p className="text-red-500">Article non disponible</p>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-bold mb-2">{article.title || "Titre indisponible"}</h2>
            <p className="text-gray-700 mb-4">{article.content || "Contenu indisponible"}</p>

            {article.image && (
                <img
                    src={article.image}
                    alt={article.title || "Image indisponible"}
                    className="w-full h-64 object-cover rounded-md mb-4"
                />
            )}

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Publié par {article.user?.name || "Auteur inconnu"}
                </p>
                <ShareArticleButton articleId={article.id} />
            </div>
        </div>
    );
};

export default Card;
