using API.Interfaces;

namespace API.DTO
{
    public class CalendarTaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime? Start { get; set; }
        public bool AllDay { get; set; } = true;
        public bool Completed { get; set; }
        public DateTime? CompletedWhen { get; set; }
        public DateTime? Deadline { get; set; }
        public string RRULE { get; set; }

        public CalendarTaskDTO(int id, string title, bool completed, DateTime? completedWhen, DateTime? deadline, RecurrenceInterval recurrence)
        {
            Id = id;
            Title = title;
            Start = CalculateStartTime(completed, completedWhen, deadline);
            Completed = completed;
            CompletedWhen = completedWhen;
            Deadline = deadline;
            RRULE = MapRecurrenceIntervalToRRule(recurrence);
        }

        private static DateTime? CalculateStartTime(bool completed, DateTime? completedWhen, DateTime? deadline)
        {
            return completed
                ? completedWhen
                : deadline;
        }

        private static string MapRecurrenceIntervalToRRule(RecurrenceInterval recurrence)
        {
            switch(recurrence)
            {
                case RecurrenceInterval.Day: return "FREQ=DAILY";
                case RecurrenceInterval.Week: return "FREQ=WEEKLY";
                case RecurrenceInterval.Month: return "FREQ=MONTHLY";
                case RecurrenceInterval.Year: return "FREQ=YEARLY";
            }

            return "";
        }
    }
}
