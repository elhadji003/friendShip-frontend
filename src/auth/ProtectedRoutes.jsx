import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true;
    }
};

const ProtectedRoutes = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // Vérifier si le token est expiré
    if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return <Navigate to="/login-register" replace />;
    }

    // Vérifier si l'utilisateur est authentifié et a le bon rôle
    if (token) {
        if (requiredRole && userRole !== requiredRole) {
            return <Navigate to="/403" replace />;
        }
        return children;
    }

    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    return <Navigate to="/login-register" replace />;
};

export default ProtectedRoutes;