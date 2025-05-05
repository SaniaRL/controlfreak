using API.Interfaces;

namespace API.DTO
{
    public class CreateTask : IAmStackable
    {
        public required string Title { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? DeadLine { get; set; }
        public bool IsStackable { get; set; }
        public string? RRule { get; set; }
    }
}
