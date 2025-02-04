import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Récupère le rôle de l'utilisateur

    // Vérifie si l'utilisateur est authentifié et a le bon rôle (admin, par exemple)
    if (token) {
        if (requiredRole && userRole !== requiredRole) {
            // Si le rôle n'est pas celui requis, redirige vers une page différente (par exemple, une page d'accès interdit ou d'accueil)
            return <Navigate to="/403" replace />; // Page d'accès interdit
        }
        return children; // Si tout est bon, afficher les enfants
    }

    // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
    return <Navigate to="/login-register" replace />;
};

export default ProtectedRoutes;
