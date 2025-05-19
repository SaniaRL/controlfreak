using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class AppDbContext : DbContext
    {
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<EventItem> Events { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<EventTemplate> EventTemplates { get; set; }
        public DbSet<ButtonProps> ButtonProps { get; set; }

        public string DbPath { get; }

        public AppDbContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "ControlFreak.db");
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");

        public void CreateBaseButtonProps()
        {
            List<ButtonProps> buttonProps =
            [
                new(toolTip: "Tvättid", iconSrc: "/icons/laundry.png", altText:"Laundry Button"),
                new(toolTip: "Morgon", iconSrc: "/icons/sun.png", altText:"Morning Laundry Button"),
                new(toolTip: "Kväll", iconSrc: "/icons/moon.png", altText:"Evening Laundry Button"),
                new(toolTip: "Arbete", iconSrc: "/icons/work.png", altText:"Work Button"),
                new(toolTip: "Dag", iconSrc: "/icons/sun.png", altText:"Day Work Button"),
                new(toolTip: "Natt", iconSrc: "/icons/moon.png", altText:"Night Work Button")
            ];

            this.ButtonProps.AddRange(buttonProps);
            this.SaveChanges();
        }
        public void CreateBaseEventTemplates()
        {
            List<EventTemplate> eventTemplates =
            [
                new(
                    title: "Tvättid",
                    tags: [],
                    allDay: false,
                    categoryId: 22,
                    buttonPropsId: 1
                ),
            ];
            this.EventTemplates.AddRange(eventTemplates);
            this.SaveChanges();
        }

        //public EventTemplate(string title, string[]? tags, bool allDay, int? categoryId, int buttonPropsId, List<EventTemplate> eventTemplates)
        //{
        //    Title = title;
        //    Tags = tags;
        //    AllDay = allDay;
        //    CategoryId = categoryId;
        //    ButtonPropsId = buttonPropsId;
        //    EventTemplates = eventTemplates;
        //}




    }
}
