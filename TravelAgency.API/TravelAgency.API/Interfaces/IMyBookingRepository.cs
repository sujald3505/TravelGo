using TravelAgency.API.Models;

namespace TravelAgency.API.Repositories.Interfaces;

public interface IMyBookingRepository
{
    Task<IEnumerable<Booking>> GetAllByUserIdAsync(int userId);

    Task<Booking?> GetDetailsAsync(int bookingId);
}