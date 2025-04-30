using API.Interfaces;

namespace API.Entities
{
    public class TaskItem : Post, ICanComplete, IHasDeadline
    {
        public bool Completed { get; private set; } = false;

        public DateTime? CompletedWhen { get; private set; }
        public DateTime? DeadLine { get; set; }
        public TaskItem(string title, DateTime? deadline, RecurrenceInterval recurrence) : base(title, recurrence)
        {
            DeadLine = deadline;
        }
        public TaskItem(string title, RecurrenceInterval recurrence) : base(title, recurrence) { }

        public void SetCompleted(bool completed)
        {
            Completed = completed;

            CompletedWhen = Completed ? DateTime.Now : null;

            Update();
        }
    }
}
