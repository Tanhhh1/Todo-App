using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class TaskRepository : BaseRepository<TodoTask>, ITaskRepository
    {
        public TaskRepository(DatabaseContext context) : base(context) { }
    }
}
