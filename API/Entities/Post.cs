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
        public string[]? Tags { get; private set; }

        public string? RRule{ get; private set; }
        public DateTime[] ExDates { get; private set; } = Array.Empty<DateTime>();

        public Post(string title, string[]? tags, string rRule, DateTime[] exDates)
        {
            Title = title;
            Tags = tags;
            RRule = rRule;
            ExDates = exDates;
        }
        public void Update()
        {
            UpdatedWhen = DateTime.Now;
        }

        public void SetTitle(string title)
        {
            Title = title;

            Update();
        }

        public void SetRRule(string? rRule)
        {
            RRule = rRule;

            Update();
        }

        public void SetTags(string[] tags)
        {
            Tags = tags;

            Update();
        }

        public void SetExDates(DateTime[] exDates) 
        { 
            ExDates = exDates; 
            
            Update();
        
        }

        public void AddExDate(DateTime exDate)
        {
            if (!ExDates.Contains(exDate))
            {
                ExDates = ExDates.Append(exDate).ToArray();
                Update();
            }
        }

        public void RemoveExDate(DateTime exDate)
        {
            if (ExDates.Contains(exDate))
            {
                ExDates = ExDates.Where(d => d != exDate).ToArray();
                Update();
            }
        }

    }
}
