using TravelGo.Application.DTOs.Destination;

namespace TravelGo.Application.Interfaces;

public interface IDestinationService
{
    Task<IEnumerable<DestinationDto>> GetAllAsync();

    Task<DestinationDto?> GetByIdAsync(int id);

    Task<DestinationDto> CreateAsync(CreateDestinationDto dto);

    Task<DestinationDto?> UpdateAsync(int id, UpdateDestinationDto dto);

    Task<bool> DeleteAsync(int id);
}