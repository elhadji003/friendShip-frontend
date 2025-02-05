import React, { useState } from "react";
import { toast } from "react-toastify";
import { useShareArticleMutation } from "../features/articles/articlesAPI";

const ShareArticleButton = ({ articleId }) => {
    const [shareArticle, { isLoading }] = useShareArticleMutation();
    const [recipientId, setRecipientId] = useState("");

    const handleShare = async () => {
        if (!recipientId) {
            toast.error("Veuillez entrer l'ID du destinataire.");
            return;
        }

        try {
            await shareArticle({ articleId, recipientId }).unwrap();
            toast.success("Article envoyé avec succès !");
        } catch (error) {
            toast.error(error.data?.error || "Erreur lors de l'envoi.");
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                type="number"
                placeholder="ID du destinataire"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                className="border p-1 rounded"
            />
            <button
                onClick={handleShare}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                {isLoading ? "Envoi..." : "Envoyer"}
            </button>
        </div>
    );
};

export default ShareArticleButton;
