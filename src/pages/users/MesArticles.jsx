import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDeleteArticleMutation, useGetMyArticleQuery } from "../../features/articles/articlesAPI";
import Pagination from "../../components/Pagination";
import ModalArticle from "../../components/ModalArticle";
import ModalUpdateArticle from "../../components/ModalUpdateArticle";

const MesArticles = () => {
    // Gestion des modals
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const { data, isLoading, refetch } = useGetMyArticleQuery();
    const [deleteArticle] = useDeleteArticleMutation();

    const handleIsOpen = () => setIsOpen(true);

    const handleIsOpenModalUpdate = (article) => {
        setSelectedArticle(article);
        setIsOpenModalUpdate(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
            try {
                await deleteArticle(id);
                refetch();
            } catch (err) {
                console.error("Erreur lors de la suppression de l'article:", err);
            }
        }
    };

    return (
        <div>
            <button
                className="bg-green-500 mb-3 w-fit m-auto p-2 rounded-md text-white"
                onClick={handleIsOpen}
            >
                Créer un article
            </button>

            <div className="bg-white text-black rounded-lg shadow-md p-6 mb-4">
                {isLoading ? (
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="border-t-4 border-gray-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
                    </div>
                ) : (
                    data?.articles?.length > 0 ? (
                        data.articles.map((art) => (
                            <div key={art.id} className="border-b pb-4 mb-4">
                                <h2 className="text-xl text-gray-500 font-bold mb-2">{art.title}</h2>
                                <p className="text-gray-700 mb-4">{art.content}</p>
                                <div className="space-x-3">
                                    <button onClick={() => handleIsOpenModalUpdate(art)}>
                                        <FaPencilAlt color="blue" />
                                    </button>
                                    <button onClick={() => handleDelete(art.id)}>
                                        <FaTrashAlt color="red" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 flex flex-col justify-center">
                            <span className="text-center mb-3">Aucun article disponible</span>
                            <button
                                className="bg-black w-fit m-auto p-2 rounded-md text-white"
                                onClick={handleIsOpen}
                            >
                                Créer un article
                            </button>
                        </div>
                    )
                )}

                <ModalArticle
                    isOpen={isOpen}
                    isClose={() => setIsOpen(false)}
                    refetch={refetch}
                />

                <ModalUpdateArticle
                    isOpen={isOpenModalUpdate}
                    isClose={() => setIsOpenModalUpdate(false)}
                    refetch={refetch}
                    article={selectedArticle}
                />

                <Pagination />
            </div>
        </div>
    );
};

export default MesArticles;
