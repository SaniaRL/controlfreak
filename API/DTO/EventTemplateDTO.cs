using API.Entities;

namespace API.DTO
{
    public class EventTemplateDTO
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string[]? Tags { get; set; } = null;
        public string? Rrule { get; set; } = null;
        public string? Content { get; set; } = null;
        public DateTime? Start { get; set; } = null;
        public DateTime? End { get; set; } = null;
        public DateTime? StartTime { get; set; } = null;
        public DateTime? EndTime { get; set; } = null;
        public bool AllDay { get; set; }
        public CategoryDTO? Category { get; set; } = null;
        public ButtonPropsDTO? ButtonProps { get; set; }
        public List<EventTemplateDTO>? Children { get; set; }

        public static EventTemplateDTO FromEntity(EventTemplate entity)
        {
            return new EventTemplateDTO
            {
                Id = entity.Id,
                Title = entity.Title,
                Tags = entity.Tags,
                Rrule = entity.RRule,
                Content = entity.Content,
                Start = entity.Start,
                End = entity.End,
                StartTime = entity.StartTime,
                EndTime = entity.EndTime,
                AllDay = entity.AllDay,
                Category = entity.Category != null ? CategoryDTO.FromEntity(entity.Category) : null,
                ButtonProps = entity.ButtonProps != null ? ButtonPropsDTO.FromEntity(entity.ButtonProps) : null,
                Children = null
            };
        }

        public static EventTemplateDTO FromEntityWithChildren(EventTemplate entity)
        {
            var dto = FromEntity(entity);
            dto.Children = entity.EventTemplates?.Select(FromEntityWithChildren).ToList();
            return dto;
        }
    }
}