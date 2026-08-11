using Microsoft.EntityFrameworkCore;
using TravelAgency.API.Data;
using TravelAgency.API.Interfaces;
using TravelAgency.API.Models;

namespace TravelAgency.API.Repositories;

public class DestinationRepository : IDestinationRepository
{
    private readonly ApplicationDbContext _context;

    public DestinationRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Destination>> GetAllAsync()
    {
        return await _context.Destinations
            .Where(d => !d.IsDeleted)
            .ToListAsync();
    }

    public async Task<Destination?> GetByIdAsync(int id)
    {
        return await _context.Destinations
            .FirstOrDefaultAsync(d => d.Id == id && !d.IsDeleted);
    }

    public async Task<Destination> CreateAsync(Destination destination)
    {
        await _context.Destinations.AddAsync(destination);
        await _context.SaveChangesAsync();

        return destination;
    }

    public async Task<Destination?> UpdateAsync(Destination destination)
    {
        _context.Destinations.Update(destination);
        await _context.SaveChangesAsync();

        return destination;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var destination = await _context.Destinations.FindAsync(id);

        if (destination == null || destination.IsDeleted)
            return false;

        destination.IsDeleted = true;
        destination.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }
}