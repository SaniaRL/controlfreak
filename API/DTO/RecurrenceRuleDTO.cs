namespace API.DTO
{
    public class RecurrenceRuleDTO
    {
        public int Id { get; set; }
        public string Freq { get; set; } = null!;
        public DateTime? Until { get; set; }
        public DateTime Dtstart {  get; set; }

    }
}
