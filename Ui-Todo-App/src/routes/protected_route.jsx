import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth_context';

const ProtectedRoute = ({ allowedRoles, isAuth = false }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    if (isAuth) {
        if (user) {
            return user.role === 'Admin' 
                ? <Navigate to="/admin/tasks" replace /> 
                : <Navigate to="/my-tasks" replace />;
        }
        return <Outlet />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return user.role === 'Admin' 
            ? <Navigate to="/admin/tasks" replace /> 
            : <Navigate to="/my-tasks" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;