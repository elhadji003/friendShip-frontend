import React from 'react';
import { FaPlane } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Acceuil = () => {
    return (
        <div className="relative bg-neutral-900 min-h-screen text-white flex items-center justify-center font-mono sm:text-sm">
            <div className="absolute top-10 left-0 w-full overflow-hidden">
                <div className="animate-plane flex items-center space-x-3">
                    <span className="text-xl font-bold text-white bg-white p-2 text-gray-900 rounded-md">Hello my friend !</span> ---
                    <FaPlane className="text-3xl text-white" />
                </div>
            </div>

            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 max-sm:text-md max-sm:text-center">
                    Bienvenue sur FriendShip Website
                </h1>
                <div className="flex gap-4">
                    <Link to={'/login-register'} className="relative px-6 py-3 text-white font-bold rounded-lg overflow-hidden group hover:bg-white">
                        <span className="absolute inset-0 border-white animate-border"></span>
                        <span className="absolute inset-0 bg-neutral-900 rounded-lg m-[2px]"></span>
                        <span className="relative">Se connecter</span>
                    </Link>

                    <Link to={'/login-register'} className="relative px-6 py-3 text-white font-bold rounded-lg overflow-hidden group hover:bg-white">
                        <span className="absolute inset-0 border-white animate-border"></span>
                        <span className="absolute inset-0 bg-neutral-900 rounded-lg m-[2px]"></span>
                        <span className="relative">S'inscrire</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Acceuil;
