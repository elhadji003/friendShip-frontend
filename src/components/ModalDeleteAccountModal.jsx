import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useDeleteAccountMutation } from "../features/users/userAPI";
import { useNavigate } from "react-router-dom";

// Configuration de la modale pour l'accessibilité
Modal.setAppElement("#root");

const ModalDeleteAccountModal = ({ isOpen, onRequestClose }) => {
    const [password, setPassword] = useState("");
    const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        if (!password) {
            toast.error("Veuillez entrer votre mot de passe.");
            return;
        }

        try {
            // Envoie la requête de suppression avec le mot de passe
            await deleteAccount({ password }).unwrap();

            // Supprimer le token JWT du localStorage
            localStorage.removeItem("token");

            // Afficher un message de succès
            toast.success("Compte supprimé avec succès !");

            // Rediriger vers la page d'accueil
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la suppression du compte :", error);
            toast.error("Erreur lors de la suppression du compte. Veuillez réessayer.");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">Supprimer mon compte</h2>
                <p className="mb-4 text-gray-700">
                    Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
                    Veuillez entrer votre mot de passe pour confirmer.
                </p>

                {/* Champ de mot de passe */}
                <input
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Boutons d'action */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onRequestClose}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        disabled={isLoading}
                        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:bg-red-400"
                    >
                        {isLoading ? "Suppression en cours..." : "Supprimer"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalDeleteAccountModal;