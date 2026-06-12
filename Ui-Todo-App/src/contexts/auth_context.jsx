import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLoginState = (token) => {
        localStorage.setItem('token', token);

        const decoded = jwtDecode(token);

        setUser({
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role
        });

        return decoded.role;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                handleLoginState(token);
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login: handleLoginState, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};