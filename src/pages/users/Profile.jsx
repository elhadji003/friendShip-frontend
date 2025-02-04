import React, { useState, useEffect } from "react";
import imageDefaultUser from "../../assets/user.png";
import { useGetMeQuery, useUpdateProfileImageMutation, useUpdateProfileMutation } from "../../features/auth/authApi";
import { FaCamera } from "react-icons/fa";
import { toast } from 'react-toastify';


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
            toast.success('Profil mis à jour avec succès !')
            setIsEditing(false)
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
            setUpdateError("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
            toast.error("Erreur lors de la mise à jour du profil. Veuillez réessayer")
        }
    };

    // Sauvegarder l'image de profil
    const handleSaveProfileImage = async (e) => {
        e.preventDefault();
        setIsUploadingImage(true);

        const formData = new FormData();
        if (profileImage instanceof File) {
            formData.append("profile_image", profileImage);
        }

        try {
            const response = await updateProfileImage(formData).unwrap();

            // Mettre à jour l'URL de l'image avec la nouvelle URL retournée par le backend
            setImageUrl(response.profile_image_url);
            setPreviewImage(response.profile_image_url);
            setUpdateError(null);
            alert("Image de profil mise à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'image", error);
            setUpdateError("Erreur lors de la mise à jour de l'image de profil.");
        } finally {
            setIsUploadingImage(false);
        }
    };

    if (isLoading) {
        return <div className="text-center">Chargement...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Erreur: {error.message}</div>;
    }

    if (!user) {
        return <div className="text-center text-red-500">Vous devez être connecté pour accéder à votre profil.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
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
                                ? <span className="text-green-500">en ligne</span>
                                : <span className="text-red-500">Déconnecté</span>
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Informations</h3>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Nom</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <p className="text-lg text-gray-800 font-bold font-mono font-mono">{user.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-gray-700">Adresse</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <p className="text-lg text-gray-800 font-bold font-mono">{user.address}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-gray-700">Numéro de téléphone</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <p className="text-lg text-gray-800 font-bold font-mono">{user.phone}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="ville" className="block text-gray-700">Ville</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="ville"
                                name="ville"
                                value={ville}
                                onChange={(e) => setVille(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <p className="text-lg text-gray-800 font-bold font-mono">{user.ville}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="pays" className="block text-gray-700">Pays</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="pays"
                                name="pays"
                                value={pays}
                                onChange={(e) => setPays(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <p className="text-lg text-gray-800 font-bold font-mono">{user.pays}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-gray-700">Rôle</label>
                        <p className="text-lg text-gray-800 font-bold font-mono">{user.role}</p>
                    </div>

                    <div>
                        <label htmlFor="is_connected" className="block text-gray-700">Genre</label>
                        <p className="text-lg text-gray-800 font-bold font-mono">{user.gender}</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md"
                >
                    {isEditing ? "Annuler" : "Modifier"}
                </button>

                {isEditing && (
                    <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 text-white bg-green-600 rounded-md"
                    >
                        Sauvegarder
                    </button>
                )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                {profileImage && (
                    <button
                        onClick={handleSaveProfileImage}
                        className="px-4 py-2 text-white bg-green-600 rounded-md"
                    >
                        Sauvegarder l'image
                    </button>
                )}
            </div>

            {updateError && <div className="mt-4 text-red-500">{updateError}</div>}
        </div>
    );
};

export default Profile;