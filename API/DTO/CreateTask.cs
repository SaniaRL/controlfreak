using API.Interfaces;

namespace API.DTO
{
    public class CreateTask : IHasDeadline, IAmRecurring
    {
        public required string Title { get; set; }
        public DateOnly? DeadLine { get; set; }

        public RecurrenceInterval Recurrence { get; set; }
    }
}
