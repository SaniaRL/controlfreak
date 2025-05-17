using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class EventTemplate
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public EventTemplate? Parent { get; set; }
        public string Title { get; set; }
        public string[]? Tags { get; private set; }
        public string? RRule { get; private set; }
        public string? Content { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public bool AllDay { get; set; }

        public int? CategoryId { get; set; }
        public Category? Category { get; set; }

        public int ButtonPropsId { get; set; }
        public ButtonProps ButtonProps { get; set; }

        public virtual List<EventTemplate> EventTemplates { get; set; }
        public EventTemplate() { }
        public EventTemplate(string title, string[]? tags, bool allDay, int? categoryId, int buttonPropsId)
        {
            Title = title;
            Tags = tags;
            AllDay = allDay;
            CategoryId = categoryId;
            ButtonPropsId = buttonPropsId;
        }


    }
}
