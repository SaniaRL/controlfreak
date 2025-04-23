using API.Interfaces;
using Microsoft.AspNetCore.Components.Web;

namespace API.Entities
{
    public class TaskItem : Post, ICanComplete, IHasDeadline
    {
        public bool Completed { get; private set; } = false;
        public DateTime? CompletedWhen { get; private set; }
        public DateOnly? DeadLine { get; set; }
        public TaskItem(string title, RecurrenceInterval recurrence) : base(title, recurrence) { }

        public TaskItem(string title, DateOnly? deadLine, RecurrenceInterval recurrence) : base(title, recurrence)
        {
            DeadLine = deadLine;
        }

        public void SetCompleted(bool completed)
        {
            Completed = completed;

            CompletedWhen = Completed ? DateTime.Now : null;

            Update();
        }
    }
}
