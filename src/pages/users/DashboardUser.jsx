import React, { useState } from 'react';
import { useGetMeQuery } from '../../features/auth/authApi';
import { FaBell, FaEnvelope, FaHeart, FaUser } from 'react-icons/fa';
import CardArticle from '../../components/cardArticle';

const DashboardUser = () => {
    const { data: user, error, isLoading } = useGetMeQuery();

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

    const articles = [
        {
            name: "Article 1",
            likes: [
                { name: "Elhadji Malick Diop" },
                { name: "Djiby Fall" }
            ]
        },
        {
            name: "Article 2",
            likes: [
                { name: "Fallou Gaye" }
            ]
        },
        {
            name: "Article 3",
            likes: [
                { name: "Elhadji Malick Diop" }
            ]
        }
    ];


    // State to handle showing more or less friends
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="border-t-4 border-gray-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <div>Error loading user data. Please try again later.</div>;
    }

    if (!user) {
        return <div>No user data available.</div>;
    }

    return (
        <div className="min-h-screen h-full flex items-start gap-6 p-6">
            {/* Dashboard Content */}
            <div className="flex-1">
                {/* First Row - 3 Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
                        <FaBell className="text-gray-700" /> <span className="font-bold">Notification</span>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
                        <FaEnvelope className="text-gray-700" /> <span className="font-bold">Message [+100]</span>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4">
                        <FaHeart className="text-gray-700" /> <span className="font-bold">Likes [+2900]</span>
                    </div>
                </div>
                {/* Second Row - Full Width Card */}
                <CardArticle />
            </div>
            {/* Sidebar */}
            <div className="w-64 bg-white text-gray-900 shadow-lg rounded-lg p-6 self-start">
                <h1 className='text-center font-bold mb-3'>Mes amis</h1>
                <ul>
                    {amis.slice(0, showMore ? amis.length : 15).map((ami, index) => (
                        <li key={index} className='flex items-center justify-between py-2'>
                            {ami.status === "online"
                                ? <span className="font-bold">{ami.name}</span>
                                : <span className="text-gray-300">{ami.name}</span>
                            }

                            <div className="relative flex items-center">
                                <span className="relative flex h-3 w-3 group">
                                    {/* Animation de statut */}
                                    {ami.status === "online" && (
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    )}
                                    <span
                                        className={`relative inline-flex rounded-full h-3 w-3 ${ami.status === "online" ? "bg-green-500" : "bg-red-500"}`}
                                    ></span>
                                    {/* Tooltip au hover */}
                                    <span className="absolute left-1 bottom-1 hidden group-hover:block bg-black text-white text-xs rounded-md px-2 py-1 text-nowrap">
                                        {ami.status === "online" ? "En ligne" : "Déconnecté"}
                                    </span>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* Toggle Button */}
                <div className="text-center">
                    <button
                        className="mt-4 text-gray-500 hover:underline"
                        onClick={toggleShowMore}
                    >
                        {showMore ? "Voir moins" : "Voir plus"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardUser;
