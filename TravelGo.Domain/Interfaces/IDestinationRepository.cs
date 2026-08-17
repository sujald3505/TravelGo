using TravelGo.Domain.Entities;

namespace TravelGo.Domain.Interfaces;

public interface IDestinationRepository
{
    Task<IEnumerable<Destination>> GetAllAsync();

    Task<Destination?> GetByIdAsync(int id);

    Task<Destination> CreateAsync(Destination destination);

    Task<Destination?> UpdateAsync(Destination destination);

    Task<bool> DeleteAsync(int id);
}