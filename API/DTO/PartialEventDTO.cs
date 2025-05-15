namespace API.DTO
{
    public class PartialEventDTO
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public bool? AllDay { get; set; }
        public int? CategoryId { get; set; }
        public CategoryDTO? Category { get; set; }
        public string[]? Tags { get; set; }
        public string? Rrule { get; set; }
    }
}
