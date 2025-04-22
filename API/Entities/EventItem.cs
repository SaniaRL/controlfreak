using System.ComponentModel.DataAnnotations;
using API.Interfaces;

namespace API.Entities
{
    public class EventItem : Post
    {
        public string Content { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; } = null!;

        public EventItem(string description, string content, DateTime startTime, DateTime endTime, int categoryId, RecurrenceInterval recurrence) 
            : base(description, recurrence)
        {
            Content = content;
            StartTime = startTime;
            EndTime = endTime;
            CategoryId = categoryId;
        }
    }
}
