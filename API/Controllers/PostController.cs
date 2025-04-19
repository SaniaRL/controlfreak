using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("posts")]
    public class PostController : ControllerBase
    {
        public readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<TaskItem>> GetAll(
            [FromQuery] bool includeCompletedTasks = false)
        {
            try
            {
                var tasks = includeCompletedTasks
                    ? _context.Tasks.ToList()
                    : _context.Tasks.Where(x => !(x.Completed)).ToList();


                if (tasks.Count > 0)
                {
                    return Ok(tasks);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return NotFound("No tasks found.");
        }


        [HttpPost("new")]
        public async Task<ActionResult<Task>> CreateTask([FromBody] CreateTask taskData)
        {
            var task = new TaskItem(taskData.Description, taskData.DeadLine, taskData.Recurrence.Recurrence);

            _context.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpDelete("{id}/delete")]
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

        [HttpPut("{id}/complete")]
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
