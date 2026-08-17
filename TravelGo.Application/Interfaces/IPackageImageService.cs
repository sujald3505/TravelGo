using TravelGo.Application.DTOs.PackageImage;

namespace TravelGo.Application.Interfaces;

public interface IPackageImageService
{
    Task<IEnumerable<PackageImageDto>> GetByPackageIdAsync(int packageId);

    Task<PackageImageDto?> GetByIdAsync(int id);

    Task<PackageImageDto> CreateAsync(CreatePackageImageDto dto);

    Task<PackageImageDto?> UpdateAsync(
        int id,
        UpdatePackageImageDto dto
    );

    Task<bool> DeleteAsync(int id);
}