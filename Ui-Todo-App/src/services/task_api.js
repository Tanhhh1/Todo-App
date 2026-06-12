import axiosInstance from './axios_config';

export const taskApi = {

    adminCreateTask: async (createTaskRequest) => {
        return await axiosInstance.post('/tasks', createTaskRequest);
    },

    adminGetAllTasks: async () => {
        return await axiosInstance.get('/tasks');
    },

    adminGetTaskById: async (id) => {
        return await axiosInstance.get(`/tasks/${id}`);
    },

    adminUpdateTaskStatus: async (id, updateStatusRequest) => {
        return await axiosInstance.put(`/tasks/${id}/status`, updateStatusRequest);
    },

    getMyTasks: async () => {
        return await axiosInstance.get('/tasks/my-tasks');
    },

    getMyTaskById: async (id) => {
        return await axiosInstance.get(`/tasks/my-tasks/${id}`);
    },

    updateMyTaskStatus: async (id, updateStatusRequest) => {
        return await axiosInstance.put(`/tasks/my-tasks/${id}/status`, updateStatusRequest);
    }
};