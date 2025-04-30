using API.Interfaces;

namespace API.DTO
{
    public class CreateEvent
    {
        public required string Title { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
        public bool AllDay { get; set; }
        public RecurrenceInterval Recurrence { get; set; }
        public int CategoryId { get; set; }
    }
}
