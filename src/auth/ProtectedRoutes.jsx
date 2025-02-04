import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to='/login-register' replace />
}

export default ProtectedRoutes;
