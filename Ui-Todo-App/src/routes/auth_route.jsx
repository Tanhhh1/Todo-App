import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth_context';

const AuthRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    if (user) {
        return user.role === 'Admin' 
            ? <Navigate to="/admin/tasks" replace /> 
            : <Navigate to="/my-tasks" replace />;
    }

    return <Outlet />;
};

export default AuthRoute;