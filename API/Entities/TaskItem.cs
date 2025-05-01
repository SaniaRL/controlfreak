using API.Interfaces;

namespace API.Entities
{
    public class TaskItem : Post, ICanComplete, IHasDeadline, IAmStackable
    {
        public bool Completed { get; private set; } = false;

        public DateTime? CompletedWhen { get; private set; }
        public DateTime? DeadLine { get; set; }
        public bool IsStackable { get; set; } = true;

        public TaskItem(string title, DateTime? deadline, bool isStackable, int? recurrenceRuleId) : base(title, recurrenceRuleId)
        {
            DeadLine = deadline;
            IsStackable = isStackable;
        }
        public TaskItem(string title, int? recurrenceRuleId) : base(title, recurrenceRuleId) { }

        public void SetCompleted(bool completed)
        {
            Completed = completed;

            CompletedWhen = Completed ? DateTime.Now : null;

            Update();
        }
    }
}
