import React from "react";
import Card from "./Card";
import { useGetArticlesQuery } from "../features/articles/articlesAPI";

const CardList = () => {
    const { data: articles, isLoading, error } = useGetArticlesQuery();

    if (isLoading) return <p>Chargement des articles...</p>;
    if (error) return <p className="text-red-500">Erreur lors du chargement des articles.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles && articles.length > 0 ? (
                articles.map((article) => (
                    <Card key={article.id} article={article} />
                ))
            ) : (
                <p>Aucun article disponible.</p>
            )}
        </div>
    );
};

export default CardList;
