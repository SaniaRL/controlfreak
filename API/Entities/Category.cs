using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Category
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Background { get; set; }
        public string Foreground { get; set; }

        List<Event> Events { get; set; }

        public Category(string name, string background, string foreground)
        {
            Name = name;
            Background = background;
            Foreground = foreground;
            Events = new List<Event>();
        }
    }
}
