using API;
using API.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add CORS so we can access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyApp", policy =>
        policy.WithOrigins("http://localhost:5174")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowAnyOrigin());
});

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowMyApp");
app.UseAuthorization();
app.MapControllers();

//Detta gjorde att det inte ens gick att komma åt porten i webläsare alls

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    var events = db.EventTemplates.Where(x => x.Id == 1 || x.Id == 2).ToList();
    var parent = db.EventTemplates.Find(3);
    if (events.Count() == 2)
    {
        foreach (var e in events)
        {
            e.Parent = parent;
            db.EventTemplates.Update(e);
            db.SaveChanges();
        }

    }

}


app.Run();

