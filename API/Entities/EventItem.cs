using System.ComponentModel.DataAnnotations;
using API.Interfaces;

namespace API.Entities
{
    public class EventItem : Post
    {
        public string Content { get; set; }
        public DateTime Start { get; private set; }
        public DateTime? End { get; private set; }
        public bool AllDay { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; } = null!;

        public EventItem(string title, string content, DateTime start, DateTime? end, bool allDay, int categoryId, int? recurrenceRuleId) 
            : base(title, recurrenceRuleId)
        {
            Content = content;
            Start = start;
            End = end;
            AllDay = allDay;
            CategoryId = categoryId;
        }
    }
}
