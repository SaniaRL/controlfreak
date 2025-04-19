using API.Interfaces;
using Microsoft.AspNetCore.Components.Web;

namespace API.Entities
{
    public class TaskItem : Post, ICanComplete, IHasDeadline
    {
        public bool Completed { get; private set; } = false;
        public DateTime? CompletedWhen { get; private set; }
        public DateTime? DeadLine { get; set; }
        public TaskItem(string description, RecurrenceInterval recurrence) : base(description, recurrence) { }

        public TaskItem(string description, DateTime? deadLine, RecurrenceInterval recurrence) : base(description, recurrence)
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
