using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using TravelGo.Infrastructure.Data;
using TravelGo.Application.Helpers;
using TravelGo.Domain.Entities;

namespace TravelGo.Infrastructure.Seed;

public static class DataSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Seed Roles
        if (!await context.Roles.AnyAsync())
        {
            var roles = new List<Role>
            {
                new Role { Name = AppRoles.Admin },
                new Role { Name = AppRoles.Customer }
            };

            await context.Roles.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }

        // Seed Admin User
        if (!await context.Users.AnyAsync(u => u.Email == "admin@travelagency.com"))
        {
            var adminRole = await context.Roles
                .FirstAsync(r => r.Name == AppRoles.Admin);

            var admin = new User
            {
                FirstName = "System",
                LastName = "Admin",
                Email = "admin@travelagency.com",
                PhoneNumber = "9999999999",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                RoleId = adminRole.Id,
                IsActive = true
            };

            await context.Users.AddAsync(admin);
            await context.SaveChangesAsync();
        }
    }
}