import React from "react";
import { useGetReceivedArticlesQuery } from "../features/articles/articlesAPI";

const ReceivedArticles = () => {
    const { data: receivedArticles, isLoading, error } = useGetReceivedArticlesQuery();

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement des articles.</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Articles reçus</h2>
            {receivedArticles.length > 0 ? (
                receivedArticles.map((share) => (
                    <div key={share.id} className="border p-4 mb-2 rounded">
                        <h3 className="text-lg font-semibold">{share.article.title}</h3>
                        <p>{share.article.content}</p>
                        <p className="text-sm text-gray-500">Envoyé par: {share.sender.name}</p>
                    </div>
                ))
            ) : (
                <p>Aucun article reçu.</p>
            )}
        </div>
    );
};

export default ReceivedArticles;
