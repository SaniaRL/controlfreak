using System.ComponentModel.DataAnnotations;
using API.Interfaces;

namespace API.Entities
{
    public class EventItem : Post
    {
        public string Content { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; } = null!;

        public EventItem(string title, string content, DateTime start, DateTime end, int categoryId, RecurrenceInterval recurrence) 
            : base(title, recurrence)
        {
            Content = content;
            Start = start;
            End = end;
            CategoryId = categoryId;
        }
    }
}
