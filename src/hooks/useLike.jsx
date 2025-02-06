import { useMemo } from "react";
import { useGetLikesQuery } from "../features/articles/articlesAPI";

const useLikes = (articles) => {
    // Récupère les likes pour chaque article (sans casser l'ordre des hooks)
    const likesQueries = articles.map(article => useGetLikesQuery(article.id));

    // Formatage des résultats
    return useMemo(() => {
        return articles.reduce((acc, article, index) => {
            acc[article.id] = likesQueries[index].data || { totalLikes: 0, likers: [] };
            return acc;
        }, {});
    }, [likesQueries, articles]);
};

export default useLikes;
