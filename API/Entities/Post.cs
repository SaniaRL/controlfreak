using System.ComponentModel.DataAnnotations.Schema;
using API.Interfaces;

namespace API.Entities
{
    public class Post : IAmRecurring
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Description { get; private set; }
        public DateTime CreatedWhen { get; set; } = DateTime.Now;
        public DateTime UpdatedWhen { get; private set; }
        public RecurrenceInterval Recurrence { get; set; }

        public Post(string description, RecurrenceInterval recurrence)
        {
            Description = description;
            Recurrence = recurrence;
        }
        public void Update()
        {
            UpdatedWhen = DateTime.Now;
        }

        public void SetDescription(string description)
        {
            Description = description;

            Update();
        }
    }
}
