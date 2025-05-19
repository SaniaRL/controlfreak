namespace API.DTO
{
    //public class PresetConfigDTO
    //{
    //    public int Id {  get; set; }
    //    public PresetTaskDTO? DefaultTask { get; set; }
    //    public EventDTO? DefaultEvent { get; set; }
    //    public ButtonProps ButtonProps { get; set; }
    //}

    // LISTOR KANSKE SEN WTF

    //public class ButtonProps
    //{
    //    public string? Variant { get; set; }
    //    public string? Label { get; set; }
    //    public IconProps? IconProps { get; set; }
    //    public string? ClassName { get; set; }

    //}
    public class IconProps
    {
        public string Src { get; set; }
        public string Alt { get; set; }

    }

    public class PresetTaskDTO
    {
        public string Title { get; set; } = string.Empty;
        public DateOnly? StartDate { get; set; }
        public TimeOnly? StartTime { get; set; }
        public DateOnly? EndDate { get; set; }
        public TimeOnly? EndTime { get; set; }
        public bool AllDay { get; set; } = true;
        public DateOnly? DeadlineDate { get; set; }
        public bool IsStackable { get; set; } = true;
        public string? Rrule { get; set; } = null;

    }

}
