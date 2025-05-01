namespace API.Entities
{
    public class RecurrenceRule
    {
        public int Id { get; set; }
        public string Freq { get; set; } = null!;
        public DateTime? Until { get; set; }
        public DateTime Start { get; set; }


        public RecurrenceRule(string freq, DateTime? until, DateTime start)
        {
            Freq = freq;
            Until = until;
            Start = start;
        }
    }
}
