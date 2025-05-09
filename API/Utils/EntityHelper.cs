using API.DTO;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Utils
{
    public static class EntityHelper
    {
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
                Category = eventItem.Category,
                Tags = eventItem.Tags,
                Rrule = eventItem.RRule
            };

            return eventVM;
        }

        public static EventItem MapEventDTOToEvent(EventDTO evenDTO)
        {
            var eventItem = new EventItem(
                title: evenDTO.Title,
                content: evenDTO.Content,
                start: evenDTO.Start,
                end: evenDTO.End,
                allDay: evenDTO.AllDay,
                categoryId: evenDTO.Category.Id,
                tags: evenDTO.Tags,
                rRule: evenDTO.Rrule);

            return eventItem;
        }


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
            if (partial.AllDay.HasValue) 
            {
                eventItem.SetAllday(partial.AllDay.Value);
            }
            if(partial.Category != null && partial.Category.Id.HasValue)
            {
                eventItem.SetCategory(partial.Category.Id.Value);
            }
            if(partial.Tags != null)
            {
                eventItem.SetTags(partial.Tags);
            }

            return eventItem;
        }

        //public static EventItem CreateEventFromPartial(PartialEventDTO partial)
        //{
        //    var eventItem = new EventItem(
        //        title: partial.Title ?? "", 
        //        content: partial.Content ?? "", 
        //        start: partial.Start ?? DateTime.Now, 
        //        end: partial.End, 
        //        allDay: partial.AllDay ?? partial.End != null 
        //            ? false 
        //            : true, 
        //        categoryId: partial., 
        //        rRule: null, tags: null);

        //    return eventItem;
        //}

    }
}
