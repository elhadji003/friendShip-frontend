import React, { useState, useEffect } from "react";
import imageDefaultUser from "../../assets/user.png";
import { useGetMeQuery, useUpdateProfileImageMutation, useUpdateProfileMutation } from "../../features/auth/authAPI";
import { FaCamera, FaEdit, FaSave, FaTrash, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';
import ModalDeleteAccountModal from "../../components/ModalDeleteAccountModal";


const Profile = () => {
    const { data: user, error, isLoading } = useGetMeQuery();
    const [updateProfile] = useUpdateProfileMutation();
    const [updateProfileImage] = useUpdateProfileImageMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [ville, setVille] = useState("");
    const [pays, setPays] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    // Suppression du compte
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Mettre à jour les états locaux lorsque l'utilisateur est chargé
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setAddress(user.address || "");
            setPhone(user.phone || "");
            setVille(user.ville || "");
            setPays(user.pays || "");
            setGender(user.gender || "");
            setRole(user.role || "");
            setIsConnected(user.is_connected || false);
            setImageUrl(user.profile_image_url || null);
            setPreviewImage(user.profile_image_url || imageDefaultUser);
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();

        try {
            await updateProfile({
                name,
                address,
                phone,
                ville,
                pays,
                role,
                gender,
                is_connected: isConnected,
            }).unwrap();
            setUpdateError(null);
            toast.success('Profil mis à jour avec succès !');
            setIsEditing(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
            setUpdateError("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
            toast.error("Erreur lors de la mise à jour du profil. Veuillez réessayer");
        }
    };

    const handleSaveProfileImage = async (e) => {
        e.preventDefault();
        setIsUploadingImage(true);

        const formData = new FormData();
        if (profileImage instanceof File) {
            formData.append("profile_image", profileImage);
        }

        try {
            const response = await updateProfileImage(formData).unwrap();
            setImageUrl(response.profile_image_url);
            setPreviewImage(response.profile_image_url);
            setUpdateError(null);
            toast.success("Image de profil mise à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'image", error);
            setUpdateError("Erreur lors de la mise à jour de l'image de profil.");
            toast.error("Erreur lors de la mise à jour de l'image de profil.");
        } finally {
            setIsUploadingImage(false);
        }
    };



    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="border-t-4 border-gray-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">Erreur: {error.message}</div>;
    }

    if (!user) {
        return <div className="text-center text-red-500">Vous devez être connecté pour accéder à votre profil.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            {/* Section Photo de profil */}
            <div className="flex max-sm:flex-col max-sm:text-center items-center space-x-4">
                <div className="relative">
                    <img
                        src={imageUrl || previewImage || imageDefaultUser}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="profileImageInput"
                        />
                        <label htmlFor="profileImageInput" className="cursor-pointer">
                            <FaCamera color="white" />
                        </label>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-nowrap">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div>
                        <p className="text-sm text-gray-800">
                            {user.is_connected
                                ? <span className="relative mt-3 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                : <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>

                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Section Informations */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Informations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { label: "Nom", value: name, onChange: setName, id: "name" },
                        { label: "Adresse", value: address, onChange: setAddress, id: "address" },
                        { label: "Téléphone", value: phone, onChange: setPhone, id: "phone" },
                        { label: "Ville", value: ville, onChange: setVille, id: "ville" },
                        { label: "Pays", value: pays, onChange: setPays, id: "pays" },
                        // { label: "Rôle", value: role, onChange: setRole, id: "role" },
                        { label: "Genre", value: gender, onChange: setGender, id: "gender" },
                    ].map((field, index) => (
                        <div key={index}>
                            <label htmlFor={field.id} className="block text-gray-700">{field.label}</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    id={field.id}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            ) : (
                                <p className="text-lg text-gray-800 font-bold font-mono">{field.value}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Boutons d'action */}
            <div className="mt-6 flex justify-end space-x-4">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 text-white bg-gray-600 rounded-md flex items-center space-x-2"
                >
                    {isEditing ? <FaTimes /> : <FaEdit />}
                    <span>{isEditing ? "Annuler" : "Modifier"}</span>
                </button>

                {isEditing && (
                    <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 text-white bg-gray-600 rounded-md flex items-center space-x-2"
                    >
                        <FaSave />
                        <span>Sauvegarder</span>
                    </button>
                )}

                <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-4 py-2 text-white bg-red-600 rounded-md flex items-center space-x-2"
                >
                    <FaTrash />
                    <span>Supprimer mon compte</span>
                </button>
            </div>

            {/* Sauvegarder l'image */}
            {profileImage && (
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSaveProfileImage}
                        className="px-4 py-2 text-white bg-black rounded-md flex items-center space-x-2"
                    >
                        <FaSave />
                        <span>Sauvegarder l'image</span>
                    </button>
                </div>
            )}

            {/* Modale de suppression du compte */}
            <ModalDeleteAccountModal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
            />

            {updateError && <div className="mt-4 text-red-500">{updateError}</div>}
        </div>
    );
};

export default Profile;