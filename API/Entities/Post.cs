using System.ComponentModel.DataAnnotations.Schema;
using API.Interfaces;

namespace API.Entities
{
    public class Post : IAmRecurring
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; private set; }
        public DateTime CreatedWhen { get; set; } = DateTime.Now;
        public DateTime UpdatedWhen { get; private set; }

        public int? RecurrenceRuleId { get; set; }
        public RecurrenceRule? RecurrenceRule { get; set; }

        //TODO fixa private set med update

        public Post(string title, int? recurrenceRuleId)
        {
            Title = title;
            RecurrenceRuleId = recurrenceRuleId;
        }
        public void Update()
        {
            UpdatedWhen = DateTime.Now;
        }

        public void SetDescription(string title)
        {
            Title = title;

            Update();
        }
    }
}
