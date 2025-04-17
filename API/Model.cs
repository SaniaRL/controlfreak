using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class AppDbContext : DbContext
    {
        public DbSet<TaskItem> Tasks { get; set; }

        public string DbPath { get; }

        public AppDbContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "ControlFreak.db");
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");

        //public void CreateTasks()
        //{
        //    List<TaskItem> taskList = 
        //    [
        //        new("Boka tvättid"),
        //        new("Ta ut soporna"),
        //        new("Diska"),
        //        new("Ring Terese"),
        //        new("Tömma kattlådan"),
        //        new("Torka köksytor"),
        //        new("Ta undan tvätt"),
        //        new("Vattna blommorna"),
        //        new("Skura köket"),
        //        new("Rensa kylskåpet"),
        //        new("Skura sovrummet"),
        //        new("Panta"),
        //        new("Promenad"),
        //        new("Ring mormor och morfar"),
        //        new("Ring Madelene"),
        //        new("Lägg in hyran"),
        //        new("Skura hallen")
        //    ];

        //    Tasks.AddRange(taskList);
        //    SaveChanges();
        //}
    }
}
