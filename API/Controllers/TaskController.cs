using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("APIv1/tasks")]
    public class TaskController : ControllerBase
    {
        public readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GET")]
        public ActionResult<List<TaskDTO>> GetTasks()
        {
            try
            {
                var tasks = _context.Tasks.ToList();

                var taskVMs = tasks.Select(x => new TaskDTO
                {
                    Id = x.Id,
                    Title = x.Title,
                    Completed = x.Completed,
                    CompletedWhen = x.CompletedWhen,
                    Deadline = x.DeadLine,
                    IsStackable = x.IsStackable,
                    Rrule = x.RRule
                }).ToList();

                return Ok(taskVMs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GET/{id}")]
        public ActionResult<TaskDTO> GetTask(int id)
        {
            try
            {
                var task = _context.Tasks.First(x => x.Id == id);

                var taskVM = new TaskDTO
                {
                    Id = task.Id,
                    Title = task.Title,
                    Completed = task.Completed,
                    CompletedWhen = task.CompletedWhen,
                    Deadline = task.DeadLine,
                    IsStackable = task.IsStackable,
                    Rrule = task.RRule
                };

                return Ok(taskVM);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("POST")]
        public async Task<ActionResult<Task>> CreateTask([FromBody] CreateTask taskData)
        {

            var task = new TaskItem(title: taskData.Title, deadline: taskData.DeadLine, isStackable: taskData.IsStackable, rRule: taskData.RRule);

            _context.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpDelete("DELETE/{id}")]
        public async Task<ActionResult<Task>> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("PUT/{id}/completed")]
        public async Task<ActionResult<Task>> UpdateCompletionStatus(int id,
            [FromBody] bool isCompleted)
        {
            var task = _context.Tasks.FirstOrDefault(x => x.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            task.SetCompleted(isCompleted);

            await _context.SaveChangesAsync();

            return Ok(task);
        }
    }
}
