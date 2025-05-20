using API.DTO;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Utils
{
    public static class EntityHelper
    {
        public static EventDTO MapEventToEventDTO(EventItem eventItem)
        {
            var categoryDTO = MapCategoryToCategoryDTO(eventItem.Category);

            var eventDTO = new EventDTO
            {
                Id = eventItem.Id,
                Title = eventItem.Title,
                Start = eventItem.Start,
                Content = eventItem.Content,
                End = eventItem.End,
                AllDay = eventItem.AllDay,
                CategoryId = eventItem.CategoryId,
                Category = categoryDTO,
                Tags = eventItem.Tags,
                Rrule = eventItem.RRule,
                ExDates = eventItem.ExDates ?? Array.Empty<DateTime>()
            };

            return eventDTO;
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
            if (partial.Category != null && partial.Category.Id.HasValue)
            {
                eventItem.SetCategory(partial.Category.Id.Value);
            }
            if (partial.Tags != null)
            {
                eventItem.SetTags(partial.Tags);
            }

            return eventItem;
        }

        public static CategoryDTO MapCategoryToCategoryDTO(Category category)
        {
            return new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                BackgroundColor = category.BackgroundColor,
                TextColor = category.TextColor,
            };
        }

        public static Category MapCategoryDTOToCategory(CategoryDTO categoryDTO)
        {
            return new Category(name: categoryDTO.Name, backgroundColor: categoryDTO.BackgroundColor, textColor: categoryDTO.TextColor);

        }

    }
}
