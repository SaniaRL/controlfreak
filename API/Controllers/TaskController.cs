using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet]
        public async Task<ActionResult<List<TaskDTO>>> GetTasks()
        {
            try
            {
                var tasks = await _context.Tasks.ToListAsync();

                var taskDTOs = tasks.Select(x => new TaskDTO
                {
                    Id = x.Id,
                    Title = x.Title,
                    Completed = x.Completed,
                    CompletedWhen = x.CompletedWhen,
                    Deadline = x.DeadLine,
                    IsStackable = x.IsStackable,
                    Rrule = x.RRule
                }).ToList();

                return Ok(taskDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDTO>> GetTask(int id)
        {
            try
            {
                var task = await _context.Tasks.FirstOrDefaultAsync(x => x.Id == id);

                if (task == null)
                    return NotFound();

                var taskDTO = new TaskDTO
                {
                    Id = task.Id,
                    Title = task.Title,
                    Completed = task.Completed,
                    CompletedWhen = task.CompletedWhen,
                    Deadline = task.DeadLine,
                    IsStackable = task.IsStackable,
                    Rrule = task.RRule
                };

                return Ok(taskDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<TaskDTO>> CreateTask([FromBody] CreateTask taskData)
        {
            if (taskData == null)
                return BadRequest();

            var task = new TaskItem(
                title: taskData.Title,
                deadline: taskData.DeadLine,
                isStackable: taskData.IsStackable,
                tags: null,
                rRule: taskData.Rrule);

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            var taskDTO = new TaskDTO
            {
                Id = task.Id,
                Title = task.Title,
                Completed = task.Completed,
                CompletedWhen = task.CompletedWhen,
                Deadline = task.DeadLine,
                IsStackable = task.IsStackable,
                Rrule = task.RRule
            };

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, taskDTO);
        }

        [HttpPut("{id}/completed")]
        public async Task<ActionResult<TaskDTO>> UpdateCompletionStatus(int id,
        [FromBody] bool isCompleted)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            task.SetCompleted(isCompleted);
            await _context.SaveChangesAsync();

            var taskDTO = new TaskDTO
            {
                Id = task.Id,
                Title = task.Title,
                Completed = task.Completed,
                CompletedWhen = task.CompletedWhen,
                Deadline = task.DeadLine,
                IsStackable = task.IsStackable,
                Rrule = task.RRule
            };

            return Ok(taskDTO);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            return NotFound();
            

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
