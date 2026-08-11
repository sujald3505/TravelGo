using AutoMapper;
using TravelAgency.API.DTOs.PackageImage;
using TravelAgency.API.Models;
using TravelAgency.API.Repositories.Interfaces;
using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Services.Implementations;

public class PackageImageService : IPackageImageService
{
    private readonly IPackageImageRepository _repository;
    private readonly IMapper _mapper;

    public PackageImageService(
        IPackageImageRepository repository,
        IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PackageImageDto>>
        GetByPackageIdAsync(int packageId)
    {
        var images =
            await _repository.GetByPackageIdAsync(packageId);

        return _mapper.Map<IEnumerable<PackageImageDto>>(images);
    }

    public async Task<PackageImageDto?> GetByIdAsync(int id)
    {
        var image =
            await _repository.GetByIdAsync(id);

        if (image == null)
            return null;

        return _mapper.Map<PackageImageDto>(image);
    }

    public async Task<PackageImageDto> CreateAsync(
        CreatePackageImageDto dto)
    {
        var image = _mapper.Map<PackageImage>(dto);

        var created =
            await _repository.CreateAsync(image);

        return _mapper.Map<PackageImageDto>(created);
    }

    public async Task<PackageImageDto?> UpdateAsync(
        int id,
        UpdatePackageImageDto dto)
    {
        var existing =
            await _repository.GetByIdAsync(id);

        if (existing == null)
            return null;

        _mapper.Map(dto, existing);

        var updated =
            await _repository.UpdateAsync(existing);

        return _mapper.Map<PackageImageDto>(updated);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}