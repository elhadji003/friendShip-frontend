import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetMeQuery, useLoginMutation, useRegisterMutation } from '../features/auth/authApi';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        gender: 'male',
    });

    const navigate = useNavigate();

    const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
    const { data: user } = useGetMeQuery()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation des champs
        if (!formData.email || !formData.password || (isLogin ? false : !formData.name) || !formData.gender) {
            toast.error("Tous les champs doivent être remplis");
            return;
        }

        if (!isLogin && formData.password !== formData.password_confirmation) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            if (isLogin) {
                const response = await login({ email: formData.email, password: formData.password }).unwrap();
                localStorage.setItem("token", response.token);

                const isAdmin = user?.role == "admin"

                if (isAdmin) {
                    navigate('/dashboard-admin');
                } else {
                    navigate('/dashboard-user');
                }

                toast.success("Connexion réussie");
            } else {
                // Inscription
                await register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation,
                    gender: formData.gender, // Envoi du gender lors de l'inscription
                }).unwrap();
                toast.success("Inscription réussie");
                setIsLogin(true);  // Changer l'état pour passer à la page de connexion
                navigate('/login');  // Rediriger vers la page de connexion après l'inscription
                refetch()
            }
        } catch (error) {
            toast.error(error.message || "Une erreur est survenue, veuillez réessayer.");
        }
    };

    return (
        <div className="bg-neutral-900 min-h-screen text-white flex items-center justify-center font-mono sm:text-sm">
            <div className="w-full max-w-md max-sm:max-w-sm flex flex-col items-center border border-neutral-600 shadow-md p-6 rounded-lg">
                <h1 className="text-3xl font-bold mb-6 max-sm:text-md max-sm:text-center">
                    {isLogin ? "Se connecter" : "S'inscrire"}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">Nom</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 mt-1 rounded bg-neutral-800 border-b text-white focus:outline-none"
                                placeholder="Entrez votre nom"
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 rounded bg-neutral-800 border-b text-white focus:outline-none"
                            placeholder="Entrez votre email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 rounded bg-neutral-800 border-b text-white focus:outline-none"
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>
                    {!isLogin && (
                        <>
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium">Confirmer le mot de passe</label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-1 rounded bg-neutral-800 border-b text-white focus:outline-none"
                                    placeholder="Confirmer votre mot de passe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Genre</label>
                                <div className="flex gap-6 mt-2">
                                    <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={formData.gender === 'male'}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <span className="hover:text-teal-400">Homme</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer text-sm">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={formData.gender === 'female'}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <span className="hover:text-pink-400">Femme</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="flex flex-col gap-4 mt-4">
                        <button
                            type="submit"
                            className="relative px-6 py-3 text-white font-bold rounded-lg overflow-hidden group hover:bg-white"
                            disabled={isLoginLoading || isRegisterLoading}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-white animate-border"></span>
                            <span className="absolute inset-0 bg-neutral-900 rounded-lg m-[2px]"></span>
                            <span className="relative">
                                {isLogin ? "Se connecter" : "S'inscrire"}
                            </span>
                        </button>
                        {isLogin && <p className='text-end underline'>Mot de passe oublié</p>}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-400 hover:underline"
                        >
                            {isLogin ? "Pas encore inscrit ? S'inscrire" : "Déjà un compte ? Se connecter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
