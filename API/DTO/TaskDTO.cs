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

        public RecurrenceRuleDTO? RRule { get; set; } = null;


        //public CalendarTaskDTO(int id, string title, bool completed, DateTime? completedWhen, DateTime? deadline, RecurrenceInterval recurrence)
        //{
        //    Id = id;
        //    Title = title;
        //    Start = CalculateStartTime(completed, completedWhen, deadline);
        //    Completed = completed;
        //    CompletedWhen = completedWhen;
        //    Deadline = deadline;
        //}

        //private static DateTime? CalculateStartTime(bool completed, DateTime? completedWhen, DateTime? deadline)
        //{
        //    return completed
        //        ? completedWhen
        //        : deadline;
        //}
    }
}
