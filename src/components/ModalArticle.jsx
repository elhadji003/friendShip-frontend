import React, { useState } from 'react';
import { useCreateArticleMutation } from '../features/articles/articlesAPI';

const ModalArticle = ({ isOpen, isClose, refetch }) => {
    if (!isOpen) return null;

    const [values, setValues] = useState({
        title: "",
        content: ""
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const [createArticle, { isLoading, error }] = useCreateArticleMutation();

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            await createArticle(values).unwrap();
            setValues({ title: "", content: "" });
            refetch(); // Rafraîchir la liste des articles
            isClose(); // Fermer le modal
        } catch (err) {
            console.error("Erreur lors de la création de l'article:", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative animate-fadeIn">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold mb-4">Créer mon article</span>
                    <button onClick={isClose} className="text-gray-600 hover:text-gray-900">✖</button>
                </div>

                <form onSubmit={handleCreate} className="flex flex-col">
                    <label htmlFor="title">Titre</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md outline-none"
                        required
                    />

                    <label htmlFor="content" className="mt-2">Contenu</label>
                    <textarea
                        id="content"
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md outline-none"
                        rows="4"
                        required
                    />

                    {error && <p className="text-red-500 text-sm mt-2">{error.data?.message || "Une erreur est survenue"}</p>}

                    <button
                        type="submit"
                        className="bg-black text-white rounded-md mt-3 p-2 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? "Création en cours..." : "Créer"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalArticle;