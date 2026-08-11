using TravelAgency.API.DTOs.MyBooking;

namespace TravelAgency.API.Services.Interfaces;

public interface IMyBookingService
{
    Task<IEnumerable<MyBookingDto>> GetAllByUserIdAsync(int userId);

    Task<MyBookingDto?> GetDetailsAsync(int bookingId);
}