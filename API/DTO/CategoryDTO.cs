using API.Entities;

namespace API.DTO
{
    public class CategoryDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string BackgroundColor { get; set; }
        public string TextColor { get; set; }

        public static CategoryDTO FromEntity(Category category)
        {
            return new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                BackgroundColor = category.BackgroundColor,
                TextColor = category.TextColor
            };

        }
    }
}
