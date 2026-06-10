using Application.DTOs.Users;

namespace Application.DTOs.Tasks
{
    public class TaskResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string Status { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<UserResponse> AssignedUsers { get; set; } = new();
    }
}
