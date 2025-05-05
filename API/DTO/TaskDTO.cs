using API.Interfaces;

namespace API.DTO
{
    public class TaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime? Start { get; set; }
        public bool AllDay { get; set; } = true;
        public bool Completed { get; set; }
        public DateTime? CompletedWhen { get; set; }
        public DateTime? Deadline { get; set; }
        public bool IsStackable { get; set; }

        public string? Rrule { get; set; } = null;

    }
}
