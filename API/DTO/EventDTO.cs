﻿using API.Entities;
using API.Interfaces;

namespace API.DTO
{
    public class EventDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
        public bool AllDay { get; set; }
        public int? CategoryId { get; set; }
        public CategoryDTO Category { get; set; }
        public string[]? Tags { get; set; }
        public string? Rrule{ get; set; }
        public DateTime[] ExDates { get; set; } = [];

    }
}
