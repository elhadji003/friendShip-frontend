import React, { useState } from "react";
import { useDeleteArticleMutation, useGetMyArticleQuery } from "../../features/articles/articlesAPI";
import imageDefault from '../../assets/user.png'
import Pagination from "../../components/Pagination";
import ModalArticle from "../../components/ModalArticle";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";



const MesArticles = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, refetch } = useGetMyArticleQuery(page);
    const [deleArticle] = useDeleteArticleMutation()
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async (id) => {
        try {
            await deleArticle(id).unwrap();
            refetch();
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };


    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }

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
        <div>
            <button className="bg-green-500 mb-3 w-fit m-auto p-2 rounded-md text-white" onClick={handleIsOpen}>Créer un article</button>

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
                                    <h2 className="text-xl text-gray-500 font-bold mb-2">{art.title}</h2>
                                    <p className="text-gray-700 mb-4">{art.content}</p>
                                    <div className="space-x-3">
                                        <button><FaPencilAlt color="blue" /></button>
                                        <button onClick={() => handleDelete(art.id)}><FaTrashAlt color="red" /></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 flex flex-col justify-center">
                                <span className="text-center mb-3">Aucun article disponible</span>
                                <button className="bg-black w-fit m-auto p-2 rounded-md text-white" onClick={handleIsOpen}>Créer un article</button>
                            </div>
                        )
                    )
                }

                {/* Pagination */}
                <ModalArticle isOpen={isOpen} isClose={() => setIsOpen(false)} refetch={refetch} />
                <Pagination />
            </div>
        </div>

    );
};

export default MesArticles;
