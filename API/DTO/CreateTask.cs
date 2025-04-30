using API.Interfaces;

namespace API.DTO
{
    public class CreateTask : IAmRecurring, IHasDeadline
    {
        public required string Title { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? DeadLine { get; set; }
        public RecurrenceInterval Recurrence { get; set; }
    }
}
