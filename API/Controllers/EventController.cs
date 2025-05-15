using API.DTO;
using API.Entities;
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
        public async Task<ActionResult<List<EventDTO>>> GetAll()
        {
            try
            {
                var events = await _context.Events.Include(e => e.Category).ToListAsync();

                var eventDTOs = events.Select(x => EntityHelper.MapEventToEventDTO(x)).ToList();

                return Ok(eventDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GET/{id}")]
        public async Task<ActionResult<EventDTO>> GetEvent(int id)
        {
            try
            {
                var eventItem = await _context.Events.Include(x => x.Category).FirstOrDefaultAsync(x => x.Id == id);

                if (eventItem == null)
                    return NotFound();

                var eventDTO = EntityHelper.MapEventToEventDTO(eventItem);

                return Ok(eventDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("POST")]
        public async Task<ActionResult<EventDTO>> CreateEvent([FromBody] EventDTO eventDTO)
        {
            try
            {
                if (eventDTO == null)
                {
                    return StatusCode(500, $"EVENT NULL");
                }

                var eventItem = new EventItem
                (
                    title: eventDTO.Title,
                    content: eventDTO.Content,
                    start: eventDTO.Start,
                    end: eventDTO.End,
                    allDay: eventDTO.AllDay,
                    categoryId: eventDTO.Category.Id ?? 1,
                    tags: eventDTO.Tags,
                    rRule: eventDTO.Rrule
                );

                if(eventItem == null)
                {
                    return BadRequest();
                }

                _context.Events.Add(eventItem);
                await _context.SaveChangesAsync();

                await _context.Entry(eventItem).Reference(e => e.Category).LoadAsync();

                if (eventItem.Category == null)
                {
                    return StatusCode(500, $"CATEGORY NULL!");
                }

                //eventItem = await _context.Events.Include(e => e.CategoryId).FirstOrDefaultAsync(x => x.Id == eventItem.Id);

                var createdEventDTO = new EventDTO
                {
                    Id = eventItem.Id,
                    Title = eventItem.Title,
                    Content = eventItem.Content,
                    Start = eventItem.Start,
                    End = eventItem.End,
                    AllDay = eventItem.AllDay,
                    Category = new CategoryDTO
                    {
                        Id = eventItem.Category.Id,
                        TextColor = eventItem.Category.TextColor,
                        BackgroundColor = eventItem.Category.BackgroundColor,
                    },
                    Tags = eventItem.Tags,
                    Rrule = eventItem.RRule,
                };

                return Ok(createdEventDTO);

                //return CreatedAtAction(nameof(GetEvent), new { id = eventItem.Id }, createdEventDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("PUT/{id}")]
        public async Task<ActionResult<EventDTO>> UpdateEvent(int id, [FromBody] PartialEventDTO partial)
        {
            if (partial == null)
                return BadRequest();

            //Kanske inte behöver includa kanske kan gå på id.
            var eventItem = await _context.Events.Include(e => e.Category).FirstOrDefaultAsync(x => x.Id == id);
            if (eventItem == null)
            {
                return NotFound();
            }

            eventItem = EntityHelper.MapToEntity(eventItem, partial);

            await _context.SaveChangesAsync();
            eventItem = await _context.Events.Include(e => e.Category).FirstOrDefaultAsync(x => x.Id == id);

            var eventDTO = EntityHelper.MapEventToEventDTO(eventItem);

            return Ok(eventDTO);
        }

        [HttpDelete("DELETE/{id}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            var eventItem = await _context.Events.FindAsync(id);

            if (eventItem == null)
                return NotFound();

            _context.Events.Remove(eventItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
