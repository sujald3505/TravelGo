using Microsoft.EntityFrameworkCore;
using TravelGo.Infrastructure.Data;
using TravelGo.Domain.Entities;
using TravelGo.Domain.Interfaces;

namespace TravelGo.Infrastructure.Repositories;

public class MyBookingRepository : IMyBookingRepository
{
    private readonly ApplicationDbContext _context;

    public MyBookingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Booking>> GetAllByUserIdAsync(int userId)
    {
        return await _context.Bookings
            .Include(b => b.User)
            .Include(b => b.Destination)
            
            
            .Where(b => b.UserId == userId)
            .ToListAsync();
    }

    public async Task<Booking?> GetDetailsAsync(int bookingId)
    {
        return await _context.Bookings
            .Include(b => b.User)
            .Include(b => b.Destination)
            
                
            
            .FirstOrDefaultAsync(b => b.Id == bookingId);
    }
}