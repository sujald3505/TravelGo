using TravelAgency.API.Models;

namespace TravelAgency.API.Repositories.Interfaces;

public interface IPackageImageRepository
{
    Task<IEnumerable<PackageImage>> GetByPackageIdAsync(int packageId);

    Task<PackageImage?> GetByIdAsync(int id);

    Task<PackageImage> CreateAsync(PackageImage image);

    Task<PackageImage?> UpdateAsync(PackageImage image);

    Task<bool> DeleteAsync(int id);

    Task<bool> ExistsAsync(int id);
}