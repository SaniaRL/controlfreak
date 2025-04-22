using API.Interfaces;

namespace API.DTO
{
    public class CreateEvent
    {
        public required string Description { get; set; }
        public string Content { get; set; } = string.Empty;

        public RecurrenceInterval Recurrence { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public int CategoryId { get; set; }

    }
}
