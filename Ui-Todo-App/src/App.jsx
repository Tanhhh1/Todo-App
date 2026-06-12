import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './features/layout/layout';
import LoginPage from './features/auth/login_page';
import RegisterPage from './features/auth/register_page';
import AdminTasksPage from './features/tasks/admin_task_page';
import UserTasksPage from './features/tasks/user_task_page'; 
import ProtectedRoute from './routes/protected_route';

const UserManagementPage = () => <div className="content-container"><h3>Quản lý thành viên (Comming soon)</h3></div>;

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route element={<ProtectedRoute isAuth={true} />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['User']} />}>
                <Route element={<Layout />}>
                    <Route path="/my-tasks" element={<UserTasksPage />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
                <Route element={<Layout />}>
                    <Route path="/admin/tasks" element={<AdminTasksPage />} />
                    <Route path="/admin/users" element={<UserManagementPage />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;