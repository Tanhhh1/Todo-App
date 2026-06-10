namespace Application.DTOs.Tasks
{
    public class CreateTaskRequest
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public List<int> UserIds { get; set; } = new();
    }
}
