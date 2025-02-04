import React, { useState } from 'react';
import { useGetMeQuery } from '../../features/auth/authApi';
import { FaBell, FaEnvelope, FaHeart } from 'react-icons/fa';
import CardArticle from '../../components/cardArticle';

const DashboardUser = () => {
    const { data: user, error, isLoading } = useGetMeQuery();
    const [showMore, setShowMore] = useState(false);

    const amis = [
        { name: "Elhadji Malick Diop", status: "online" },
        { name: "Djiby Fall", status: "offline" },
        { name: "Fallou Gaye", status: "online" },
        { name: "Seydou Sow", status: "offline" },
        { name: "Moussa Kane", status: "offline" },
        { name: "Mame Bousso", status: "offline" },
        { name: "Aissatou Diallo", status: "offline" },
        { name: "Binta Ba", status: "offline" },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="border-t-4 border-gray-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">Erreur de chargement des données.</div>;
    }

    if (!user) {
        return <div className="text-center">Aucune donnée utilisateur disponible.</div>;
    }

    return (
        <div className="min-h-screen flex flex-col sm:flex-row gap-6 p-4 sm:p-6">
            {/* Dashboard Content */}
            <div className="flex-1">
                {/* Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-4">
                        <FaBell className="text-gray-700 text-xl" />
                        <span className="font-bold">Notification</span>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-4">
                        <FaEnvelope className="text-gray-700 text-xl" />
                        <span className="font-bold">Message [+100]</span>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-4">
                        <FaHeart className="text-gray-700 text-xl" />
                        <span className="font-bold">Likes [+2900]</span>
                    </div>
                </div>
                {/* Articles */}
                <CardArticle />
            </div>

            {/* Sidebar */}
            <div className="w-full sm:w-64 bg-white text-gray-900 shadow-lg rounded-lg p-4 sm:p-6">
                <h1 className='text-center font-bold mb-3'>Mes amis</h1>
                <ul>
                    {amis.slice(0, showMore ? amis.length : 5).map((ami, index) => (
                        <li key={index} className='flex items-center justify-between py-2'>
                            <span className={ami.status === "online" ? "font-bold" : "text-gray-300"}>
                                {ami.name}
                            </span>
                            <div className="relative flex items-center">
                                <span className="relative flex h-3 w-3 group">
                                    {ami.status === "online" && (
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    )}
                                    <span className={`relative inline-flex rounded-full h-3 w-3 ${ami.status === "online" ? "bg-green-500" : "bg-red-500"}`}></span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* Toggle Button */}
                <div className="text-center">
                    <button
                        className="mt-4 text-gray-500 hover:underline"
                        onClick={() => setShowMore(!showMore)}
                    >
                        {showMore ? "Voir moins" : "Voir plus"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardUser;
