using TravelAgency.API.DTOs.Package;

namespace TravelAgency.API.Services.Interfaces;

public interface IPackageService
{
    Task<IEnumerable<PackageDto>> GetAllAsync();

    Task<IEnumerable<PackageDto>> GetByDestinationIdAsync(int destinationId);

    Task<PackageDto?> GetByIdAsync(int id);

    Task<PackageDto> CreateAsync(CreatePackageDto dto);

    Task<PackageDto?> UpdateAsync(int id, UpdatePackageDto dto);

    Task<bool> DeleteAsync(int id);
}