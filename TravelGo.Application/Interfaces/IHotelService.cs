using TravelGo.Application.DTOs.Hotel;

namespace TravelGo.Application.Interfaces;

public interface IHotelService
{
    Task<IEnumerable<HotelDto>> GetAllAsync();

    Task<IEnumerable<HotelDto>> GetByDestinationIdAsync(int destinationId);
    Task<HotelDto?> GetByIdAsync(int id);
    Task<HotelDto> CreateAsync(CreateHotelDto dto);
    Task<HotelDto?> UpdateAsync(int id, UpdateHotelDto dto);
    Task<bool> DeleteAsync(int id);
}