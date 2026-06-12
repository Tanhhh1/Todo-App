using Application.DTOs.Tasks;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CreateTaskRequest request)
        {
            var task = await _taskService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _taskService.GetAllAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _taskService.GetByIdAsync(id);
            if (task is null)
                return NotFound(new { message = "Task không tồn tại." });

            return Ok(task);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            var task = await _taskService.UpdateStatusAsync(id, request);
            return Ok(task);
        }

        [HttpGet("my-tasks")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetMyTasks()
        {
            var userId = int.Parse(User.FindFirstValue("id")!);
            var tasks = await _taskService.GetByUserIdAsync(userId);
            return Ok(tasks);
        }

        [HttpGet("my-tasks/{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetMyTaskById(int id)
        {
            var userId = int.Parse(User.FindFirstValue("id")!);
            var tasks = await _taskService.GetByUserIdAsync(userId);
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task is null)
                return NotFound(new { message = "Task không tồn tại." });

            return Ok(task);
        }

        [HttpPut("my-tasks/{id}/status")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UpdateMyTaskStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            var userId = int.Parse(User.FindFirstValue("id")!);
            var task = await _taskService.UpdateMyTaskStatusAsync(id, request, userId);
            return Ok(task);
        }            
    }
}