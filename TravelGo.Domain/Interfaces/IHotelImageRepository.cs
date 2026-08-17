using TravelGo.Domain.Entities;

namespace TravelGo.Domain.Interfaces;

public interface IHotelImageRepository
{
    Task<IEnumerable<HotelImage>> GetAllAsync();

    Task<HotelImage?> GetByIdAsync(int id);

    Task<IEnumerable<HotelImage>> GetByHotelIdAsync(int hotelId);

    Task<HotelImage> CreateAsync(HotelImage hotelImage);

    Task<HotelImage?> UpdateAsync(HotelImage hotelImage);

    Task<bool> DeleteAsync(int id);
}