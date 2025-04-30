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
                new(name: "Birthdays", backgroundColor: "#8A0A91", textColor: "#ffffff")
            ];

            Categories.AddRange(categoryList);
            SaveChanges();
        }

        //public TaskItem(string title, DateTime? deadline, RecurrenceInterval recurrence) : base(title, recurrence)
        //{
        //    DeadLine = deadline;
        //}


        public void CreateBaseTasks()
        {
            List<TaskItem> taskList =
            [
                new(title: "Boka tvättid", recurrence: RecurrenceInterval.Never),
                new(title: "Duscha", recurrence: RecurrenceInterval.Never),
                new(title: "Diska", recurrence: RecurrenceInterval.Never),
                new(title: "Vattna blommorna", recurrence: RecurrenceInterval.Never),
                new(title: "Tömma kattlådan", recurrence: RecurrenceInterval.Never),
            ];

            Tasks.AddRange(taskList);
            SaveChanges();
        }

        //public EventItem(string title, string content, DateTime start, DateTime? end, bool allDay, int categoryId, RecurrenceInterval recurrence) 
        //    : base(title, recurrence)
        //{
        //    Content = content;
        //    Start = start;
        //    End = end;
        //    AllDay = allDay;
        //    CategoryId = categoryId;
        //}

        public void CreateBaseEvents()
        {
            List<EventItem> eventList =
            [
                new(title: "30-årsfest!", content: "Kil 18:00. Utgång i Karlstad.", start: new DateTime(2025, 4, 26, 18, 0, 0), end: new DateTime(2025, 4, 27, 3, 0, 0), allDay: false, categoryId: 1, recurrence: RecurrenceInterval.Never),
                new(title: "Madde 30 år", content: "", start: new DateTime(2025, 4, 28, 0, 0, 0), end: null, allDay: true, categoryId: 2, recurrence: RecurrenceInterval.Never),
                new(title: "Picknick", content: "Fira Becca", start: new DateTime(2025, 5, 3, 16, 0, 0), end:  new DateTime(2025, 5, 4, 2, 0, 0), allDay: false, categoryId: 1, recurrence: RecurrenceInterval.Never),
            ];

            Events.AddRange(eventList);
            SaveChanges();
        }

    }
}
