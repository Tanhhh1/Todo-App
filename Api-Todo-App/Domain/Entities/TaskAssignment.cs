namespace Domain.Entities
{
    public class TaskAssignment
    {
        public int UserId { get; set; }
        public int TaskId { get; set; }
        public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
        public User User { get; set; } = null!;
        public TodoTask Task { get; set; } = null!;
    }
}
