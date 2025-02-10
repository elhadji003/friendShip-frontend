import React, { useEffect } from "react";
import imgDefault from "../assets/user.png";
import { useGetLikesQuery } from "../features/articles/articlesAPI";

const LikersList = ({ articleId, refreshLikers }) => {
    const { data, isLoading, error, refetch } = useGetLikesQuery(articleId);

    useEffect(() => {
        refetch();
    }, [refreshLikers, refetch]);

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur lors du chargement des likes.</p>;

    const likers = data?.likers || [];

    return (
        <div className="mt-2 flex -space-x-2">
            {likers.slice(0, 3).map((liker) => (
                <img
                    key={liker.id}
                    src={liker.profileImage || imgDefault}
                    alt={liker.name}
                    className="w-8 h-8 rounded-full border border-white"
                    title={liker.name}
                />
            ))}
            {likers.length > 3 && (
                <div className="relative group">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-sm cursor-pointer">
                        +{likers.length - 3}
                    </div>
                    <div className="absolute left-0 mt-2 max-sm:-left-20 hidden group-hover:block bg-white shadow-md p-2 rounded-md w-64 border z-10">
                        <h2 className="border-b p-2 mb-2">Aimé par</h2>
                        {likers.map((liker) => (
                            <div key={liker.id} className="flex items-center space-x-2 mb-1">
                                <img
                                    src={liker.profileImage || imgDefault}
                                    alt={liker.name}
                                    className="w-6 h-6 rounded-full"
                                />
                                <span className="text-sm">{liker.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LikersList;