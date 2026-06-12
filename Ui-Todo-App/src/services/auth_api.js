import axiosInstance from './axios_config';

export const authApi = {

    register: async (registerRequest) => {
        return await axiosInstance.post('/auth/register', registerRequest);
    },

    login: async (loginRequest) => {
        return await axiosInstance.post('/auth/login', loginRequest);
    }
};