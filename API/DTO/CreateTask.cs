using API.Interfaces;

namespace API.DTO
{
    public class CreateTask
    {
        public string Description { get; set; }
        public DateTime? DeadLine { get; set; }

        public IAmRecurring Recurrence { get; set; }
    }
}
