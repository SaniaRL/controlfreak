using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("APIv1/posts")]
    public class PostController : ControllerBase
    {
        public readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("events")]
        public ActionResult<List<TaskItem>> GetEvents()
        {
            try
            {
                var  events = _context.Events.ToList();


                if (events.Count > 0)
                {
                    return Ok(events);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return NotFound("No events found.");
        }

        [HttpGet("tasks")]
        public ActionResult<List<TaskItem>> GetTasks(
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

        [HttpPost("task")]
        public async Task<ActionResult<Task>> CreateTask([FromBody] CreateTask taskData)
        {
            var task = new TaskItem(taskData.Description, taskData.DeadLine, taskData.Recurrence);

            _context.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpPost("event")]
        public async Task<ActionResult<Task>> CreateEvent([FromBody] CreateEvent eventData)
        {  
            var newEvent = new EventItem(eventData.Description, eventData.Content, eventData.StartTime
                , eventData.EndTime, 1, RecurrenceInterval.Never);

            _context.Add(newEvent);
            await _context.SaveChangesAsync();

            return Ok(newEvent);
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
