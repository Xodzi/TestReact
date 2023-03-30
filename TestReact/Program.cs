using Microsoft.EntityFrameworkCore;
using TestReact.Models;
using TestReact.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ClinicContext>(options => options.UseSqlServer(connection));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllers();
app.MapControllerRoute(
    name: "mkb",
    pattern: "api/mkb10", new { controller = "Mkb", action = "Get" }
);
app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");


//app.MapFallbackToFile("index.html");

app.Run();
