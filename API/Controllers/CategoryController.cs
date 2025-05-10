using API.DTO;
using API.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [ApiController]
    [Route("APIv1/categories")]
    public class CategoryController : ControllerBase
    {
        public readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet()]
        public ActionResult<List<CategoryDTO>> GetAll()
        {
            try
            {
                var Categories = _context.Categories.ToList();
                var CategoryDTOs = Categories.Select(c => EntityHelper.MapCategoryToCategoryDTO(c)).ToList();

                return Ok(CategoryDTOs);
            } catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("POST")]
        public async Task<ActionResult<Task>> PostCategory([FromBody] CategoryDTO categoryDTO)
        {
            var category = EntityHelper.MapCategoryDTOToCategory(categoryDTO);

            _context.Add(category);
            await _context.SaveChangesAsync();

            return Ok(EntityHelper.MapCategoryToCategoryDTO(category));
        }

        [HttpPut("PUT/{id}")]
        public async Task<ActionResult<Task>> UpdateEvent(int id,
        [FromBody] CategoryDTO partial)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }
;
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();

            return Ok(EntityHelper.MapCategoryToCategoryDTO(category));
        }


        [HttpDelete("DELETE/{id}")]
        public async Task<ActionResult<Task>> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
