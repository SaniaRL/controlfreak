namespace API.DTO
{
    public class CreateRecurrenceRuleDTO
    {
        public string Freq { get; set; } = null!;
        public DateTime? Until { get; set; }
        public DateTime Dtstart { get; set; }

    }
}
