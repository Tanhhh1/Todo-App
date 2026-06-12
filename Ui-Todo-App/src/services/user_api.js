import axiosInstance from './axios_config';

export const userApi = {
    adminGetAllUsers: async () => {
        return await axiosInstance.get('/users');
    }
};