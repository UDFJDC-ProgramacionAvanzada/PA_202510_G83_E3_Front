// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';
import Perfil from '../pages/Perfil';

function ProtectedRoute({ children }) {
const isAuth = authService.isAuthenticated();

return isAuth ? children : <Navigate to="/login" />;
}

// Uso en App.js:
<Route path="/perfil" element={
<ProtectedRoute>
    <Perfil />
</ProtectedRoute>
} />