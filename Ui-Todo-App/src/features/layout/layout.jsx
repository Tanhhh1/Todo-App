import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use_auth'; 
import "./layout.css"

function Layout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="main-layout">
            <header className="app-header">
                <div className="logo">TodoApp</div>
                <button className="logout-btn" onClick={handleLogout}>
                    <i className='bx bx-log-out'></i> Đăng xuất
                </button>
            </header>
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}
export default Layout;