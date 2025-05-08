using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("APIv1/events")]
    public class EventController : ControllerBase
    {
        public readonly AppDbContext _context;

        public EventController(AppDbContext context)
        {
            _context = context;
        }

        //Eventuellt hämta månad för månad men med några dagar innan / efter. Dvs för det synliga intervallet endast.
        [HttpGet]
        public ActionResult<List<EventDTO>> GetAllCalendar()
        {
            try
            {
                var events = _context.Events.ToList();

                var eventVMs = events.Select(x => new EventDTO
                {
                    Id = x.Id,
                    Title = x.Title,
                    Start = x.Start,
                    Content = x.Content,
                    End = x.End,
                    AllDay = x.AllDay,
                    BackgroundColor = _context.Categories.Where(c => x.CategoryId == c.Id).Select(c => c.BackgroundColor).First(),
                    TextColor = _context.Categories.Where(c => x.CategoryId == c.Id).Select(c => c.TextColor).First(),
                    Rrule = x.RRule
                }).ToList();

                return Ok(eventVMs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GET/{id}")]
        public ActionResult<TaskDTO> GetEvent(int id)
        {
            try
            {
                var eventItem = _context.Events.First(x => x.Id == id);

                var eventVM = new EventDTO
                {
                    Id = eventItem.Id,
                    Title = eventItem.Title,
                    Start = eventItem.Start,
                    Content = eventItem.Content,
                    End = eventItem.End,
                    AllDay = eventItem.AllDay,
                    BackgroundColor = _context.Categories.Where(c => eventItem.CategoryId == c.Id).Select(c => c.BackgroundColor).First(),
                    TextColor = _context.Categories.Where(c => eventItem.CategoryId == c.Id).Select(c => c.TextColor).First(),
                    Rrule = eventItem.RRule
                };

                return Ok(eventVM);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //[HttpPost("POST")]
        //public async Task<ActionResult<Task>> CreateTask([FromBody] CreateTask taskData)
        //{
        //    //TAGS ÄR NULL
        //    var task = new TaskItem(title: taskData.Title, deadline: taskData.DeadLine, isStackable: taskData.IsStackable, tags: null, rRule: taskData.RRule);

        //    _context.Add(task);
        //    await _context.SaveChangesAsync();

        //    return Ok(task);
        //}

        [HttpDelete("DELETE/{id}")]
        public async Task<ActionResult<Task>> DeleteEvent(int id)
        {
            var eventItem = await _context.Events.FindAsync(id);

            if (eventItem == null)
            {
                return NotFound();
            }

            _context.Events.Remove(eventItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
