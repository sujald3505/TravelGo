using TravelGo.Domain.Entities;

namespace TravelGo.Domain.Interfaces;

public interface IBookingRepository
{
    Task<IEnumerable<Booking>> GetAllAsync();

    Task<Booking?> GetByIdAsync(int id);

    Task<IEnumerable<Booking>> GetByUserIdAsync(int userId);

    Task<Booking> CreateAsync(Booking booking);

    Task<Booking?> UpdateAsync(Booking booking);

    Task<bool> DeleteAsync(int id);

    Task<bool> ExistsAsync(int id);
}