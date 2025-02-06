const Pagination = ({ page, setPage, hasMore }) => {
    return (
        <div className="flex justify-between mt-4">
            <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
                Précédent
            </button>
            <button
                onClick={() => setPage(prev => prev + 1)}
                disabled={!hasMore}
                className={`px-4 py-2 rounded-md ${!hasMore ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
                Suivant
            </button>
        </div>
    );
};

export default Pagination;
