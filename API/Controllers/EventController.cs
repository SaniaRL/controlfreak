using API.DTO;
using API.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("GET")]
        public ActionResult<List<EventDTO>> GetAll()
        {
            try
            {
                var events = _context.Events.Include(e => e.Category).ToList();

                var eventDTOs = events.Select(x => EntityHelper.MapEventToEventDTO(x)).ToList();

                return Ok(eventDTOs);
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
                var eventItem = _context.Events.Include(x => x.Category).First(x => x.Id == id);

                var eventDTO = EntityHelper.MapEventToEventDTO(eventItem);

                return Ok(eventDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("POST")]
        public async Task<ActionResult<Task>> CreateEvent([FromBody] EventDTO eventDTO)
        {
            var eventItem = EntityHelper.MapEventDTOToEvent(eventDTO);

            _context.Add(eventItem);
            await _context.SaveChangesAsync();

            return Ok(EntityHelper.MapEventToEventDTO(eventItem));
        }

        [HttpPut("PUT/{id}")]
        public async Task<ActionResult<Task>> UpdateEvent(int id,
            [FromBody] PartialEventDTO partial)
        {
            var eventItem = await _context.Events.Include(e => e.Category).FirstOrDefaultAsync(x => x.Id == id);

            if (eventItem == null)
            {
                return NotFound();
            }

            eventItem = EntityHelper.MapToEntity(eventItem, partial);
            _context.Events.Update(eventItem);
            await _context.SaveChangesAsync();

            eventItem = await _context.Events.Include(e => e.Category).FirstOrDefaultAsync(x => x.Id == id);

            //TODO kan va null men no no no
            return Ok(EntityHelper.MapEventToEventDTO(eventItem));
        }


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
