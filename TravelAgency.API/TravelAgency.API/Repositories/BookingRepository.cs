using Microsoft.EntityFrameworkCore;
using TravelAgency.API.Data;
using TravelAgency.API.Models;
using TravelAgency.API.Repositories.Interfaces;

namespace TravelAgency.API.Repositories.Implementations;

public class BookingRepository : IBookingRepository
{
    private readonly ApplicationDbContext _context;

    public BookingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Booking>> GetAllAsync()
    {
        return await _context.Bookings
    .Include(b => b.User)
    .Include(b => b.Destination)
    .Include(b => b.Package)
    .Include(b => b.Hotel)
    .ToListAsync();

    }

    public async Task<Booking?> GetByIdAsync(int id)
    {
        return await _context.Bookings
    .Include(b => b.User)
    .Include(b => b.Destination)
    .Include(b => b.Package)
    .Include(b => b.Hotel)
    .FirstOrDefaultAsync(b => b.Id == id);
    }
    public async Task<IEnumerable<Booking>> GetByUserIdAsync(int userId)
    {
        return await _context.Bookings
            .Include(b => b.User)
            .Include(b => b.Destination)
            .Include(b => b.Package)
            .Include(b => b.Hotel)
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.BookingDate)
            .ToListAsync();
    }
    public async Task<Booking> CreateAsync(Booking booking)
    {
        await _context.Bookings.AddAsync(booking);
        await _context.SaveChangesAsync();

        return booking;
    }

    public async Task<Booking?> UpdateAsync(Booking booking)
    {
        _context.Bookings.Update(booking);
        await _context.SaveChangesAsync();

        return booking;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var booking = await _context.Bookings.FindAsync(id);

        if (booking == null)
            return false;

        _context.Bookings.Remove(booking);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Bookings.AnyAsync(b => b.Id == id);
    }
}
