using API.DTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("APIv1/presets")]

    public class PresetConfigController : ControllerBase
    {
        public readonly AppDbContext _context;

        public PresetConfigController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public ActionResult<List<PresetConfigDTO>> getAll()
        {
            try
            {
                //var events = _context.Events.ToList();

                var presetConfigVMs = new List<PresetConfigDTO>
                {
                    new PresetConfigDTO
                    {
                        Id = 1,
                        DefaultTask =
                        {
                            Title = "Tvättid",
                            StartTime = new TimeOnly(7, 0),
                            EndTime = new TimeOnly(14, 0),
                            AllDay = false,
                            IsStackable = false,
                        },
                        ButtonProps =
                        {
                            Variant = "Secondary",
                            IconProps =
                            {
                                Src = "",
                                Alt = "Laundry machine button"
                            }
                        }
                        


                    }
                };
                return Ok(presetConfigVMs);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
            }


        }


    }
}
