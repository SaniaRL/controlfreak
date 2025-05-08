using API.DTO;
using API.Entities;

namespace API.Utils
{
    public static class EntityHelper
    {
        public static EventItem MapToEntity(EventItem eventItem, PartialEventDTO partial)
        {
            if (partial.Title != null)
            {
                eventItem.SetTitle(partial.Title);
            }
            if (partial.Content != null)
            {
                eventItem.Content = partial.Content;
            }
            if (partial.Start.HasValue)
            {
                eventItem.SetStart(partial.Start.Value);
            }
            if (partial.End.HasValue)
            {
                eventItem.SetEnd(partial.End.Value);
            }

            return eventItem;
        }
    }
}
