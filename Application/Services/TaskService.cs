using Application.DTOs.Tasks;
using Application.DTOs.Users;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepo;
        private readonly IUserRepository _userRepo;

        public TaskService(ITaskRepository taskRepo, IUserRepository userRepo)
        {
            _taskRepo = taskRepo;
            _userRepo = userRepo;
        }

        public async Task<TaskResponse> CreateAsync(CreateTaskRequest request)
        {
            var userIdsToValidate = request.UserIds ?? new List<int>();

            var existingUserIds = await _userRepo
                .GetByCondition(u => userIdsToValidate.Contains(u.Id))
                .Select(u => u.Id)
                .ToListAsync();

            var invalidIds = userIdsToValidate.Except(existingUserIds).ToList();
            if (invalidIds.Any())
                throw new InvalidOperationException($"User không tồn tại: {string.Join(", ", invalidIds)}");

            var task = new TodoTask
            {
                Title = request.Title,
                Description = request.Description,
                CreatedAt = DateTime.UtcNow,
                TaskAssignments = userIdsToValidate.Select(uid => new TaskAssignment
                {
                    UserId = uid
                }).ToList()
            };

            await _taskRepo.AddAsync(task);
            await _taskRepo.SaveChangesAsync();

            return await GetByIdAsync(task.Id)
                ?? throw new InvalidOperationException("Không thể tải thông tin Task vừa tạo.");
        }

        public async Task<IEnumerable<TaskResponse>> GetAllAsync()
        {
            return await _taskRepo
                .GetByCondition()
                .Select(t => new TaskResponse
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status.ToString(),
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt,
                    AssignedUsers = t.TaskAssignments.Select(ta => new UserResponse
                    {
                        Id = ta.User.Id,
                        Username = ta.User.Username,
                        Email = ta.User.Email,
                        Role = ta.User.Role.ToString()
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<TaskResponse>> GetByUserIdAsync(int userId)
        {
            return await _taskRepo
                .GetByCondition(t => t.TaskAssignments.Any(ta => ta.UserId == userId))
                .Select(t => new TaskResponse
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status.ToString(),
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt,
                    AssignedUsers = t.TaskAssignments.Select(ta => new UserResponse
                    {
                        Id = ta.User.Id,
                        Username = ta.User.Username,
                        Email = ta.User.Email,
                        Role = ta.User.Role.ToString()
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<TaskResponse?> GetByIdAsync(int id)
        {
            return await _taskRepo
                .GetByCondition(t => t.Id == id)
                .Select(t => new TaskResponse
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Status = t.Status.ToString(),
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt,
                    AssignedUsers = t.TaskAssignments.Select(ta => new UserResponse
                    {
                        Id = ta.User.Id,
                        Username = ta.User.Username,
                        Email = ta.User.Email,
                        Role = ta.User.Role.ToString()
                    }).ToList()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<TaskResponse> UpdateStatusAsync(int taskId, UpdateStatusRequest request)
        {
            var task = await _taskRepo
                .GetByCondition(t => t.Id == taskId)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Task không tồn tại.");

            task.Status = request.Status;
            task.UpdatedAt = DateTime.UtcNow;

            await _taskRepo.UpdateAsync(task);
            await _taskRepo.SaveChangesAsync();

            return await GetByIdAsync(taskId)
                ?? throw new InvalidOperationException("Không thể tải lại thông tin task sau khi cập nhật.");
        }

        public async Task<TaskResponse> UpdateMyTaskStatusAsync(int taskId, UpdateStatusRequest request, int userId)
        {
            var task = await _taskRepo
                .GetByCondition(t => t.Id == taskId)
                .Include(t => t.TaskAssignments)
                .FirstOrDefaultAsync()
                ?? throw new KeyNotFoundException("Task không tồn tại.");

            if (!task.TaskAssignments.Any(ta => ta.UserId == userId))
                throw new KeyNotFoundException("Task không tồn tại.");

            task.Status = request.Status;
            task.UpdatedAt = DateTime.UtcNow;

            await _taskRepo.UpdateAsync(task);
            await _taskRepo.SaveChangesAsync();

            return await GetByIdAsync(taskId)
                ?? throw new InvalidOperationException("Không thể tải lại thông tin task sau khi cập nhật.");
        }
    }
}