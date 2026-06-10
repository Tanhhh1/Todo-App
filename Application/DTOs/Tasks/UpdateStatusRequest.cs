using Domain.Enum;

namespace Application.DTOs.Tasks
{
    public class UpdateStatusRequest
    {
        public TodoTaskStatus Status { get; set; }
    }
}
