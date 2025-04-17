using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Post
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Description { get; private set; }
        public DateTime CreatedWhen { get; set; } = DateTime.Now;
        public DateTime UpdatedWhen { get; private set; }

        public Post(string description)
        {
            Description = description;
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
