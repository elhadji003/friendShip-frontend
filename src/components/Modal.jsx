import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';

const Modal = ({ isOpen, onClose, user, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar_image: null, // Pour stocker le fichier image
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                avatar_image: null,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                avatar_image: file,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('address', formData.address);

        if (formData.avatar_image) {
            console.log("Avatar image file:", formData.avatar_image);
            formDataToSend.append('avatar_image', formData.avatar_image);
        }

        // Vérification du contenu de FormData
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await axiosClient.put('/updateUser', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Profil mis à jour avec succès !');
            onSave(response.data);
            onClose();
        } catch (error) {
            toast.error("Une erreur s'est produite lors de la mise à jour du profil.");
        }
    };


    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-[500px]">
                        <h3 className="text-2xl font-semibold text-center mb-6">Modifier le Profil</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nom */}
                            <div>
                                <label className="block text-gray-700">Nom</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Numéro */}
                            <div>
                                <label className="block text-gray-700">Numéro</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Adresse */}
                            <div>
                                <label className="block text-gray-700">Adresse</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Upload de l'image de profil */}
                            <div>
                                <label className="block text-gray-700">Image de profil</label>
                                <input
                                    type="file"
                                    name="avatar_image"
                                    onChange={handleFileChange}
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    accept="image/*"
                                />
                            </div>

                            {/* Boutons */}
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                                >
                                    Sauvegarder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
};

export default Modal;