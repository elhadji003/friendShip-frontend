import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <header className="bg-white shadow-md flex items-center justify-between p-4">
            {/* Logo ou titre */}
            <div className="text-2xl font-bold text-black">FriendShip</div>

            {/* Actions utilisateur */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative text-gray-600 hover:text-gray-800">
                    <FontAwesomeIcon icon={faBell} className="text-xl" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        3
                    </span>
                </button>

                {/* Profil utilisateur */}
                <button className="text-gray-600 hover:text-gray-800">
                    <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
                </button>
            </div>
        </header>
    );
};

export default Header;
