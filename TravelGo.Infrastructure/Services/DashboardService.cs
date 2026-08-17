using Microsoft.EntityFrameworkCore;
using TravelGo.Application.DTOs.Dashboard;
using TravelGo.Infrastructure.Data;
using TravelGo.Application.Interfaces;

namespace TravelGo.Infrastructure.Services;

public class DashboardService : IDashboardService
{
    private readonly ApplicationDbContext _context;

    public DashboardService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardDto> GetDashboardAsync()
    {
        // =========================
        // Total Counts
        // =========================

        var totalUsers = await _context.Users
            .CountAsync(x => !x.IsDeleted);

        var totalDestinations = await _context.Destinations
            .CountAsync(x => !x.IsDeleted);

        var totalPackages = await _context.Packages
            .CountAsync(x => !x.IsDeleted);

        var totalHotels = await _context.Hotels
            .CountAsync(x => !x.IsDeleted);

        var totalBookings = await _context.Bookings
            .CountAsync(x => !x.IsDeleted);


        // =========================
        // Total Revenue
        // =========================

        var totalRevenue = await _context.Bookings
            .Where(x =>
                !x.IsDeleted &&
                x.Status == "Confirmed")
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0;


        // =========================
        // Recent Bookings
        // =========================

        var recentBookings = await _context.Bookings
            .Where(x => !x.IsDeleted)
            .OrderByDescending(x => x.BookingDate)
            .Take(5)
            .Select(x => new DashboardBookingDto
            {
                Id = x.Id,

                UserName =
                    x.User != null
                        ? x.User.FirstName + " " + x.User.LastName
                        : "Unknown User",

                DestinationName =
                    x.Destination != null
                        ? x.Destination.Name
                        : "Unknown Destination",

                PackageName =
                    x.Package != null
                        ? x.Package.Name
                        : "Unknown Package",

                HotelName =
                    x.Hotel != null
                        ? x.Hotel.Name
                        : "Unknown Hotel",

                TotalAmount = x.TotalAmount,

                Status = x.Status
            })
            .ToListAsync();


        // =========================
        // Final Dashboard
        // =========================

        return new DashboardDto
        {
            TotalUsers = totalUsers,

            TotalDestinations = totalDestinations,

            TotalPackages = totalPackages,

            TotalHotels = totalHotels,

            TotalBookings = totalBookings,

            TotalRevenue = totalRevenue,

            RecentBookings = recentBookings
        };
    }
}