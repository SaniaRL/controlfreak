using API.DTO;
using API.Entities;
using API.Interfaces;
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

        [HttpGet]
        public ActionResult<List<TaskDTO>> GetTasks([FromQuery] bool includeCompletedTasks = false)
        {
            try
            {
                var tasks = includeCompletedTasks
                    ? _context.Tasks.ToList()
                    : _context.Tasks.Where(x => !(x.Completed)).ToList();


                if (tasks.Count > 0)
                {
                    //Få in RRule innan?
                    var taskVMs = tasks.Select(x => new TaskDTO
                    {
                        Id = x.Id, 
                        Title = x.Title,
                        Completed = x.Completed,
                        CompletedWhen = x.CompletedWhen,
                        Deadline = x.DeadLine, 
                        IsStackable = x.IsStackable,
                        RRule = x.RecurrenceRule != null
                        ? new RecurrenceRuleDTO
                        {
                            Freq = x.RecurrenceRule.Freq,
                            Until = x.RecurrenceRule.Until,
                            Dtstart = x.RecurrenceRule.Start
                        }
                        : null
                    }).ToList();

                    return Ok(taskVMs);
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
            int? recurrenceRuleId = null;

            if(taskData.RRule != null)
            {
                var RRule = new RecurrenceRule(freq: taskData.RRule.Freq, until: taskData.RRule.Until, start: taskData.RRule.Dtstart);
                _context.Add(RRule);
                await _context.SaveChangesAsync();
                recurrenceRuleId = RRule.Id;
            }

            var task = new TaskItem(title: taskData.Title, deadline: taskData.DeadLine, isStackable: taskData.IsStackable, recurrenceRuleId: recurrenceRuleId);

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
