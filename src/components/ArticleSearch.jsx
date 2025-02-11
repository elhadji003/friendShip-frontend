import React from "react";

const ArticleSearch = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="flex justify-between items-center max-sm:flex-col gap-2 p-3">
            <h3 className="text-center font-bold text-lg text-nowrap">Les Articles</h3>
            <input
                type="text"
                className="p-2 border border-black rounded-md outline-none"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default ArticleSearch;
