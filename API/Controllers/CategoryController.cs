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


        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> GetAll()
        {
            try
            {
                var categories = await _context.Categories.ToListAsync();
                var categoryDTOs = categories.Select(c => EntityHelper.MapCategoryToCategoryDTO(c)).ToList();
                return Ok(categoryDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);
                if (category == null)
                    return NotFound();
                var categoryDTO = EntityHelper.MapCategoryToCategoryDTO(category);
                return Ok(categoryDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost]
        public async Task<ActionResult<Task>> PostCategory([FromBody] CategoryDTO categoryDTO)
        {
            var category = EntityHelper.MapCategoryDTOToCategory(categoryDTO);

            _context.Add(category);
            await _context.SaveChangesAsync();

            return Ok(EntityHelper.MapCategoryToCategoryDTO(category));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Task>> UpdateCategory(int id,
        [FromBody] CategoryDTO partial)
        {

            var categoryFound = await _context.Categories.FindAsync(id);

            if (categoryFound == null)
            {
                return NotFound();
            }

            categoryFound.Name = partial.Name;
            categoryFound.TextColor = partial.TextColor;
            categoryFound.BackgroundColor = partial.BackgroundColor;

            _context.Categories.Update(categoryFound);
            await _context.SaveChangesAsync();

            return Ok(EntityHelper.MapCategoryToCategoryDTO(categoryFound));
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Task>> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            //TODO olika felmeddelanden?

            var categoryExistsOnEvents = _context.Events.Any(e => e.CategoryId == id);

            if (categoryExistsOnEvents)
            {
                return BadRequest("Category in use");
            }

            if (id == 1)
            {
                return BadRequest("Default category cannot be removed");
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
