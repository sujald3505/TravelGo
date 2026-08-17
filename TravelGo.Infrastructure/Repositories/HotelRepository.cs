using Microsoft.EntityFrameworkCore;
using TravelGo.Infrastructure.Data;
using TravelGo.Domain.Entities;
using TravelGo.Domain.Interfaces;

namespace TravelGo.Infrastructure.Repositories;

public class HotelRepository : IHotelRepository
{
    private readonly ApplicationDbContext _context;

    public HotelRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Hotel>> GetAllAsync()
    {
        return await _context.Hotels
            .Include(h => h.Destination)
            .Include(h => h.HotelImages)
            .ToListAsync();
    }

    public async Task<IEnumerable<Hotel>> GetByDestinationIdAsync(int destinationId)
    {
        return await _context.Hotels
            .Where(h => h.DestinationId == destinationId)
            .Include(h => h.Destination)
            .Include(h => h.HotelImages)
            .ToListAsync();
    }

    public async Task<Hotel?> GetByIdAsync(int id)
    {
        return await _context.Hotels
            .Include(h => h.Destination)
            .Include(h => h.HotelImages)
            .FirstOrDefaultAsync(h => h.Id == id);
    }

    public async Task<Hotel> CreateAsync(Hotel hotel)
    {
        _context.Hotels.Add(hotel);
        await _context.SaveChangesAsync();

        return hotel;
    }

    public async Task<Hotel> UpdateAsync(Hotel hotel)
    {
        _context.Hotels.Update(hotel);
        await _context.SaveChangesAsync();

        return hotel;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var hotel = await _context.Hotels.FindAsync(id);

        if (hotel == null)
            return false;

        _context.Hotels.Remove(hotel);
        await _context.SaveChangesAsync();

        return true;
    }
}