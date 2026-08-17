using TravelGo.Application.DTOs.MyBooking;

namespace TravelGo.Application.Interfaces;

public interface IMyBookingService
{
    Task<IEnumerable<MyBookingDto>> GetAllByUserIdAsync(int userId);

    Task<MyBookingDto?> GetDetailsAsync(int bookingId);
}