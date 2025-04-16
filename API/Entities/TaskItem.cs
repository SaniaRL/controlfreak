using API.Interfaces;

namespace API.Entities
{
    public class TaskItem : Post, ICanComplete
    {
        public bool Completed { get; private set; } = false;
        public DateTime? CompletedWhen { get; private set; }

        public TaskItem(string description) : base(description) { }

        public void SetCompleted()
        {
            Completed = !Completed;

            CompletedWhen = Completed ? DateTime.Now : null;

            Update();
        }
    }
}
