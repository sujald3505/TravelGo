using TravelGo.Application.DTOs.HotelImage;

namespace TravelGo.Application.Interfaces;

public interface IHotelImageService
{
    Task<IEnumerable<HotelImageDto>> GetAllAsync();

    Task<HotelImageDto?> GetByIdAsync(int id);

    Task<IEnumerable<HotelImageDto>> GetByHotelIdAsync(int hotelId);

    Task<HotelImageDto> CreateAsync(CreateHotelImageDto dto);

    Task<HotelImageDto?> UpdateAsync(
        int id,
        UpdateHotelImageDto dto);

    Task<bool> DeleteAsync(int id);
}