using TravelGo.Domain.Entities;

namespace TravelGo.Domain.Interfaces;

public interface IHotelRepository
{

    Task<IEnumerable<Hotel>> GetByDestinationIdAsync(int destinationId);
    Task<IEnumerable<Hotel>> GetAllAsync();
    Task<Hotel?> GetByIdAsync(int id);
    Task<Hotel> CreateAsync(Hotel hotel);
    Task<Hotel> UpdateAsync(Hotel hotel);
    Task<bool> DeleteAsync(int id);
}