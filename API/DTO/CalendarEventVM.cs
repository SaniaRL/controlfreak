using API.Interfaces;

namespace API.DTO
{
    public class CalendarEventVM : IAmRecurring
    {
        public int Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public string BackgroundColor { get; set; } = String.Empty;
        public string TextColor { get; set; } = String.Empty;
        public bool AllDay { get; set; }
        public RecurrenceInterval Recurrence { get; set; }

    }
}
