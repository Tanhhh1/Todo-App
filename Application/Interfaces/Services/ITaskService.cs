using Application.DTOs.Tasks;

namespace Application.Interfaces.Services
{
    public interface ITaskService
    {
        Task<TaskResponse> CreateAsync(CreateTaskRequest request);
        Task<IEnumerable<TaskResponse>> GetAllAsync();
        Task<IEnumerable<TaskResponse>> GetByUserIdAsync(int userId);
        Task<TaskResponse?> GetByIdAsync(int id);
        Task<TaskResponse> UpdateStatusAsync(int taskId, UpdateStatusRequest request);
        Task<TaskResponse> UpdateMyTaskStatusAsync(int taskId, UpdateStatusRequest request, int userId);
    }
}