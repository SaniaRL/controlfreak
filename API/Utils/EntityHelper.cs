using API.DTO;
using API.Entities;
using Microsoft.EntityFrameworkCore;

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
        
        //Fixa categoryID!!!!!!!!!1
        public static EventItem CreateEventFromPartial(PartialEventDTO partial)
        {
            var eventItem = new EventItem(
                title: partial.Title ?? "", 
                content: partial.Content ?? "", 
                start: partial.Start ?? DateTime.Now, 
                end: partial.End, 
                allDay: partial.AllDay ?? partial.End != null 
                    ? false 
                    : true, 
                categoryId: 1, 
                rRule: null, tags: null);

            return eventItem;
        }

        public static EventDTO MapEventToEventDTO(EventItem eventItem)
        {
            var eventVM = new EventDTO
            {
                Id = eventItem.Id,
                Title = eventItem.Title,
                Start = eventItem.Start,
                Content = eventItem.Content,
                End = eventItem.End,
                AllDay = eventItem.AllDay,
                BackgroundColor = "",
                TextColor = "",
                Rrule = eventItem.RRule
            };

            return eventVM;
        }
    }
}
