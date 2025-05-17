using API.DTO;
using API.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("APIv1/eventTemplates")]

    public class PresetConfigController : ControllerBase
    {
        public readonly AppDbContext _context;

        public PresetConfigController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<EventTemplateDTO>>> GetAll()
        {
            try
            {
                var eventTemplates = await _context.EventTemplates
                    .Include(e => e.Category)
                    .Include(e => e.ButtonProps)
                    .ToListAsync();

                var rootTemplates = eventTemplates.Where(et => et.ParentId == null).ToList();

                List<EventTemplateDTO> eventTemplateDTOs = rootTemplates.Select(x => EventTemplateDTO.FromEntityWithChildren(x)).ToList();

                return Ok(eventTemplateDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


    }


}
