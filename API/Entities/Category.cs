using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Category
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string BackgroundColor { get; set; }
        public string TextColor { get; set; }
        List<EventItem> Events { get; set; }

        public Category(string name, string backgroundColor, string textColor)
        {
            Name = name;
            BackgroundColor = backgroundColor;
            TextColor = textColor;
            Events = [];
        }
    }
}
