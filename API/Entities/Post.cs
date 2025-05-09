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

        public Post(string title, string[]? tags, string rRule)
        {
            Title = title;
            Tags = tags;
            RRule = rRule;
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


    }
}
