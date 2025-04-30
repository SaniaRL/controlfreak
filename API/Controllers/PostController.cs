using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("APIv1/tasks")]
    public class PostController : ControllerBase
    {
        public readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("calendar")]
        public ActionResult<List<CalendarTaskDTO>> CalendarGetTasks()
        {
            try
            {
                var  tasks = _context.Tasks.ToList();


                if (tasks.Count > 0)
                {
                    var taskVMs = tasks.Select(x => new CalendarTaskDTO(x.Id, x.Title, x.Completed, x.CompletedWhen, x.DeadLine, x.Recurrence)).ToList();

                    return Ok(taskVMs);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return NotFound("No tasks found.");
        }

        //[HttpGet("tasks")]
        //public ActionResult<List<TaskItem>> GetTasks(
        //    [FromQuery] bool includeCompletedTasks = false)
        //{
        //    try
        //    {
        //        var tasks = includeCompletedTasks
        //            ? _context.Tasks.ToList()
        //            : _context.Tasks.Where(x => !(x.Completed)).ToList();


        //        if (tasks.Count > 0)
        //        {
        //            return Ok(tasks);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }

        //    return NotFound("No tasks found.");
        //}

        //[HttpPost("task")]
        //public async Task<ActionResult<Task>> CreateTask([FromBody] CreateTask taskData)
        //{
        //    var task = new TaskItem(taskData.Title, taskData.DeadLine, taskData.Recurrence);

        //    _context.Add(task);
        //    await _context.SaveChangesAsync();

        //    return Ok(task);
        //}

        //[HttpPost("event")]
        //public async Task<ActionResult<Task>> CreateEvent([FromBody] CreateEvent eventData)
        //{  
        //    var newEvent = new EventItem(eventData.Title, eventData.Content, eventData.Start
        //        , eventData.End, 1, RecurrenceInterval.Never);

        //    _context.Add(newEvent);
        //    await _context.SaveChangesAsync();

        //    return Ok(newEvent);
        //}

        //[HttpDelete("{id}/delete")]
        //public async Task<ActionResult<Task>> DeleteTask(int id)
        //{
        //    var task = await _context.Tasks.FindAsync(id);

        //    if (task == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Tasks.Remove(task);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

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
