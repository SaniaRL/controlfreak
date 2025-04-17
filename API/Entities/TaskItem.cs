using API.Interfaces;
using Microsoft.AspNetCore.Components.Web;

namespace API.Entities
{
    public class TaskItem : Post, ICanComplete
    {
        public bool Completed { get; private set; } = false;
        public DateTime? CompletedWhen { get; private set; }

        public TaskItem(string description) : base(description) { }

        public void SetCompleted(bool completed)
        {
            Completed = completed;

            CompletedWhen = Completed ? DateTime.Now : null;

            Update();
        }
    }
}
