using Microsoft.EntityFrameworkCore;
using TravelAgency.API.Data;
using TravelAgency.API.Models;
using TravelAgency.API.Repositories.Interfaces;

namespace TravelAgency.API.Repositories.Implementations;

public class HotelImageRepository : IHotelImageRepository
{
    private readonly ApplicationDbContext _context;

    public HotelImageRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<HotelImage>> GetAllAsync()
    {
        return await _context.HotelImages
            .Where(x => !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<HotelImage?> GetByIdAsync(int id)
    {
        return await _context.HotelImages
            .FirstOrDefaultAsync(x =>
                x.Id == id &&
                !x.IsDeleted);
    }

    public async Task<IEnumerable<HotelImage>> GetByHotelIdAsync(int hotelId)
    {
        return await _context.HotelImages
            .Where(x =>
                x.HotelId == hotelId &&
                !x.IsDeleted)
            .OrderByDescending(x => x.IsPrimary)
            .ThenBy(x => x.Id)
            .ToListAsync();
    }

    public async Task<HotelImage> CreateAsync(HotelImage hotelImage)
    {
        _context.HotelImages.Add(hotelImage);

        await _context.SaveChangesAsync();

        return hotelImage;
    }

    public async Task<HotelImage?> UpdateAsync(HotelImage hotelImage)
    {
        var existingImage = await _context.HotelImages
            .FirstOrDefaultAsync(x =>
                x.Id == hotelImage.Id &&
                !x.IsDeleted);

        if (existingImage == null)
            return null;

        existingImage.ImageUrl = hotelImage.ImageUrl;
        existingImage.IsPrimary = hotelImage.IsPrimary;
        existingImage.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return existingImage;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var hotelImage = await _context.HotelImages
            .FirstOrDefaultAsync(x =>
                x.Id == id &&
                !x.IsDeleted);

        if (hotelImage == null)
            return false;

        hotelImage.IsDeleted = true;
        hotelImage.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }
}