using API.Entities;

namespace API.Interfaces
{
    public interface IAmRecurring
    {
        RecurrenceRule? RecurrenceRule { get; set; }
    }
}
