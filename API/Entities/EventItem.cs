using System.ComponentModel.DataAnnotations;
using API.Interfaces;

namespace API.Entities
{
    public class EventItem : Post
    {
        public string Content { get; set; }
        public DateTime Start { get; private set; }
        public DateTime? End { get; private set; }
        public bool AllDay { get; private set; }

        [Required]
        public int CategoryId { get; set; }

        public Category Category { get; set; } = null!;

        public EventItem(string title, string content, DateTime start, DateTime? end, bool allDay, int categoryId, string? rRule, string[]? tags) 
            : base(title, tags, rRule)
        {
            Content = content;
            Start = start;
            End = end;
            AllDay = allDay;
            CategoryId = categoryId;        }

        public void SetStart(DateTime start)
        {
            Start = start;
            Update();
        }
        public void SetEnd(DateTime? end)
        {
            End = end;
            Update();
        }
        public void SetAllday(bool allDay)
        {
            AllDay = allDay;
            Update();
        }


    }
}
