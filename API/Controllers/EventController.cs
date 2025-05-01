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


                if (events.Count > 0)
                {
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
                        RRule = x.RecurrenceRule != null
                            ? new RecurrenceRuleDTO{
                                Id = x.RecurrenceRule.Id,
                                Freq = x.RecurrenceRule.Freq,
                                Until = x.RecurrenceRule.Until,
                                Dtstart = x.RecurrenceRule.Start
                            }
                            : null
                    }).ToList();

                    return Ok(eventVMs);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return NotFound("No events found.");
        }

        [HttpGet("search/{input}")]
        public ActionResult<List<EventDTO>> SearchEvent(string input)
        {
            try
            {
                var events = _context.Events
                    .Where(x => x.Title
                        .ToLower()
                        .Contains(input
                            .ToLower()))
                    .ToList();


                if (events.Count > 0)
                {
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
                        RRule = x.RecurrenceRule != null
                           ? new RecurrenceRuleDTO
                           {
                               Id = x.RecurrenceRule.Id,
                               Freq = x.RecurrenceRule.Freq,
                               Until = x.RecurrenceRule.Until,
                               Dtstart = x.RecurrenceRule.Start
                           }
                           : null
                    }).ToList();

                    return Ok(eventVMs);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return NotFound("No events found.");
        }



    }
}
