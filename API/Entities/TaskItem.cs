using API.Interfaces;

namespace API.Entities
{
    public class TaskItem : Post, ICanComplete, IHasDeadline, IAmStackable
    {
        public bool Completed { get; private set; } = false;

        public DateTime? CompletedWhen { get; private set; }
        public DateTime? DeadLine { get; private set; }
        public bool IsStackable { get; set; } = true;

        public TaskItem(string title, DateTime? deadline, bool isStackable, string[] tags, string? rRule) : base(title, tags, rRule)
        {
            DeadLine = deadline;
            IsStackable = isStackable;
        }
        public TaskItem(string title, string[] tags, string? rRule) : base(title, tags, rRule) { }

        public void SetCompleted(bool completed)
        {
            Completed = completed;

            CompletedWhen = Completed ? DateTime.Now : null;

            Update();
        }

        public void SetDeadline(DateTime? deadline)
        {
            DeadLine = deadline;

            Update();
        }

    }
}
