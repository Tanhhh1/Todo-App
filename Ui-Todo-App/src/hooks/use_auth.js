import { useContext } from 'react';
import { AuthContext } from '../contexts/auth_context';

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error;
    }
    
    return context;
};

export default useAuth;