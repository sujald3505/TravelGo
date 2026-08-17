using TravelGo.Application.DTOs.Booking;

namespace TravelGo.Application.Interfaces;

public interface IBookingService
{
    Task<IEnumerable<BookingDto>> GetAllAsync();

    Task<BookingDto?> GetByIdAsync(int id);

    Task<IEnumerable<BookingDto>> GetByUserIdAsync(int userId);

    Task<BookingDto> CreateAsync(CreateBookingDto dto);

    Task<BookingDto?> UpdateAsync(
        int id,
        UpdateBookingDto dto);

    Task<BookingDto?> UpdateStatusAsync(
        int id,
        string status);

    Task<bool> DeleteAsync(int id);
}