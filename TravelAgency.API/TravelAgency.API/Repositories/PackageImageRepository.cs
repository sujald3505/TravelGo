using Microsoft.EntityFrameworkCore;
using TravelAgency.API.Data;
using TravelAgency.API.Models;
using TravelAgency.API.Repositories.Interfaces;

namespace TravelAgency.API.Repositories.Implementations;

public class PackageImageRepository : IPackageImageRepository
{
    private readonly ApplicationDbContext _context;

    public PackageImageRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PackageImage>> GetByPackageIdAsync(
        int packageId)
    {
        return await _context.PackageImages
            .Where(x => x.PackageId == packageId)
            .OrderByDescending(x => x.IsPrimary)
            .ThenBy(x => x.Id)
            .ToListAsync();
    }

    public async Task<PackageImage?> GetByIdAsync(int id)
    {
        return await _context.PackageImages
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<PackageImage> CreateAsync(
        PackageImage image)
    {
        await _context.PackageImages.AddAsync(image);

        await _context.SaveChangesAsync();

        return image;
    }

    public async Task<PackageImage?> UpdateAsync(
        PackageImage image)
    {
        _context.PackageImages.Update(image);

        await _context.SaveChangesAsync();

        return image;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var image = await _context.PackageImages
            .FirstOrDefaultAsync(x => x.Id == id);

        if (image == null)
            return false;

        _context.PackageImages.Remove(image);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.PackageImages
            .AnyAsync(x => x.Id == id);
    }
}