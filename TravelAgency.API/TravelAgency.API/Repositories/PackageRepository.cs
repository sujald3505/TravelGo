using Microsoft.EntityFrameworkCore;
using TravelAgency.API.Data;
using TravelAgency.API.Models;
using TravelAgency.API.Repositories.Interfaces;

namespace TravelAgency.API.Repositories.Implementations;

public class PackageRepository : IPackageRepository
{
    private readonly ApplicationDbContext _context;

    public PackageRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Package>> GetAllAsync()
    {
        return await _context.Packages
            .Include(p => p.Destination)
            .Include(p => p.PackageImages)
            .ToListAsync();
    }

    public async Task<IEnumerable<Package>> GetByDestinationIdAsync(int destinationId)
    {
        return await _context.Packages
            .Where(p => p.DestinationId == destinationId)
            .Include(p => p.Destination)
            .Include(p => p.PackageImages)
            .ToListAsync();
    }

    public async Task<Package?> GetByIdAsync(int id)
    {
        return await _context.Packages
            .Include(p => p.Destination)
            .Include(p => p.PackageImages)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Package> CreateAsync(Package package)
    {
        _context.Packages.Add(package);
        await _context.SaveChangesAsync();

        return package;
    }

    public async Task<Package> UpdateAsync(Package package)
    {
        _context.Packages.Update(package);
        await _context.SaveChangesAsync();

        return package;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var package = await _context.Packages.FindAsync(id);

        if (package == null)
            return false;

        _context.Packages.Remove(package);
        await _context.SaveChangesAsync();

        return true;
    }
}