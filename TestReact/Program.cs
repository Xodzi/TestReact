using Microsoft.EntityFrameworkCore;
using TestReact.Models;
using TestReact.Controllers;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string connection = builder.Configuration.GetConnectionString("DefaultConnection");

//builder.Services.AddControllersWithViews();

builder.Services.AddControllers().AddControllersAsServices();

builder.Services.AddDbContext<ClinicContext>(options => options.UseSqlServer(connection));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


//var optionsBuilder = new DbContextOptionsBuilder<ClinicContext>();
//var options = optionsBuilder
//    .UseSqlServer(connection)
//    .Options;

//using (ClinicContext db = new ClinicContext(options))
//{
//    var users = db.Mkb10s.ToList();
//    foreach (Mkb10 u in users)
//    {
//        Console.WriteLine(u.Code);
//    }
//}


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");


app.Run();
