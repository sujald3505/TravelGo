using TravelGo.Domain.Entities;

namespace TravelGo.Domain.Interfaces;

public interface IMyBookingRepository
{
    Task<IEnumerable<Booking>> GetAllByUserIdAsync(int userId);

    Task<Booking?> GetDetailsAsync(int bookingId);
}