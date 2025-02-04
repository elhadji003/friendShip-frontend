import { useState } from 'react';

const CardArticle = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const articles = [
        {
            name: "Article 1",
            likes: [
                { name: "Elhadji Malick Diop" },
                { name: "Djiby Fall" },
                { name: "Fallou Gaye" },
                { name: "Aminata Ndiaye" },
                { name: "Seydou Diallo" }
            ]
        },
        {
            name: "Article 2",
            likes: [
                { name: "Elhadji Malick Diop" },
                { name: "Djiby Fall" }
            ]
        },
        {
            name: "Article 3",
            likes: [
                { name: "Fallou Gaye" }
            ]
        }
    ];

    return (
        <div className='mt-6'>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className='text-center font-bold'>Mes Articles</h3>

                {/* Liste des articles */}
                <div className="mt-4">
                    {articles.map((article, index) => (
                        <div key={index} className="mb-4 p-4 border-b">
                            <div className="flex justify-between items-center">
                                <span className="font-bold">{article.name}</span>

                                {/* Affichage des likes */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-500 text-sm">{article.likes.length} Likes</span>

                                    {/* Cercles des utilisateurs ayant aimé */}
                                    <div className="flex items-center -space-x-2">
                                        {article.likes.slice(0, 3).map((user, userIndex) => (
                                            <div key={userIndex} className="relative">
                                                <span className="inline-block h-8 w-8 rounded-full bg-gray-300 text-white text-xs flex items-center justify-center">
                                                    {user.name.charAt(0)} {/* Affiche la première lettre du prénom */}
                                                </span>
                                            </div>
                                        ))}
                                        {article.likes.length > 3 && (
                                            <div className="relative">
                                                <span
                                                    className="inline-block h-8 w-8 rounded-full bg-gray-300 text-white text-xs flex items-center justify-center cursor-pointer"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                >
                                                    +{article.likes.length - 3}
                                                </span>

                                                {/* Dropdown pour afficher les autres utilisateurs */}
                                                {isDropdownOpen && (
                                                    <div className="absolute mt-2 p-2 bg-white border rounded-lg shadow-lg w-48 z-40">
                                                        <ul>
                                                            {article.likes.slice(3).map((user, index) => (
                                                                <li key={index} className="text-sm text-gray-700 py-1">{user.name}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardArticle;
