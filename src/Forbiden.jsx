// src/pages/Forbidden.js
import React from 'react';

const Forbidden = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-red-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">Accès Interdit</h1>
                <p className="mt-4 text-xl text-gray-700">Désolé, vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
            </div>
        </div>
    );
};

export default Forbidden;
