import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column'
            }}>
                <div>Cargando...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // IMPORTANTE: usar /Login en mayúscula
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;