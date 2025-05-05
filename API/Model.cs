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

        public string DbPath { get; }

        public AppDbContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "ControlFreak.db");
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");

        public void CreateBaseCategory()
        {
            List<Category> categoryList =
            [
                new(name: "Events", backgroundColor: "#585858", textColor: "#ffffff"),
                new(name: "Birthdays", backgroundColor: "#8A0A91", textColor: "#ffffff"),
                new(name: "Work", backgroundColor: "#486589", textColor: "#ffffff"),
            ];

            Categories.AddRange(categoryList);
            SaveChanges();
        }


        public void CreateBaseTasks()
        {
            List<TaskItem> taskList =
            [
                new(title: "Boka tvättid", rRule: null),
                new(title: "Duscha", rRule : null),
                new(title: "Diska", rRule : null),
                new(title: "Vitamin", rRule : "DTSTART=20250504T000000Z\nRRULE:FREQ=DAILY"),
            ];

            Tasks.AddRange(taskList);
            SaveChanges();
        }

        public void CreateBaseEvents()
        {
            List<EventItem> eventList =
            [
                new(title: "30-årsfest!", content: "Kil 18:00. Utgång i Karlstad.", start: new DateTime(2025, 4, 26, 18, 0, 0), end: new DateTime(2025, 4, 27, 3, 0, 0), allDay: false, categoryId: 1, rRule: null, tags: ["party", "travel"]),
                new(title: "Madde 30 år", content: "", start: new DateTime(2025, 4, 28, 0, 0, 0), end: null, allDay: true, categoryId: 2, rRule : "DTSTART=20250428T000000Z\nRRULE:FREQ=YEARLY", tags :["birthday"]),
                new(title: "Picknick", content: "Fira Becca", start: new DateTime(2025, 5, 3, 16, 0, 0), end:  new DateTime(2025, 5, 4, 2, 0, 0), allDay: false, categoryId: 1, rRule : null, tags :["party", "birthday"]),
                new(title: "Becca 33 år", content: "", start: new DateTime(2025, 5, 3, 0, 0, 0), end: null, allDay: true, categoryId: 2, rRule : "DTSTART=20250503T000000Z\nRRULE:FREQ=YEARLY", tags :["birthday"]),
                new(title: "Mamma 54 år", content: "", start: new DateTime(2025, 5, 25, 0, 0, 0), end: null, allDay: true, categoryId: 2, rRule : "DTSTART=20250525T000000Z\nRRULE:FREQ=YEARLY", tags :["birthday"]),
                new(title: "Terese 33 år", content: "", start: new DateTime(2025, 5, 31, 0, 0, 0), end: null, allDay: true, categoryId: 2, rRule : "DTSTART=20250531T000000Z\nRRULE:FREQ=YEARLY", tags :["birthday"]),
                new(title: "Dag 10h", content: "", start: new DateTime(2025, 4, 9, 8, 0, 0), end:  new DateTime(2025, 4, 9, 18, 0, 0), allDay: false, categoryId: 3, rRule : null, tags :["work"]),
                new(title: "Dag 9h", content: "", start: new DateTime(2025, 4, 20, 9, 0, 0), end:  new DateTime(2025, 4, 20, 18, 0, 0), allDay: false, categoryId: 3, rRule : null, tags :["work"]),
                new(title: "Dag 11h", content: "", start: new DateTime(2025, 4, 24, 8, 0, 0), end:  new DateTime(2025, 4, 24, 19, 0, 0), allDay: false, categoryId: 3, rRule : null, tags :["work"]),
                new(title: "Dag 9h", content: "", start: new DateTime(2025, 5, 18, 9, 0, 0), end:  new DateTime(2025, 5, 18, 18, 0, 0), allDay: false, categoryId: 3, rRule : null, tags :["work"] ),
                new(title: "Natt 6h", content: "", start: new DateTime(2025, 5, 24, 18, 0, 0), end:  new DateTime(2025, 5, 24, 23, 59, 59), allDay: false, categoryId: 3, rRule : null, tags :["work"]),
            ];

            Events.AddRange(eventList);
            SaveChanges();
        }

    }
}
