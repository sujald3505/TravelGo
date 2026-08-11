using AutoMapper;
using TravelAgency.API.DTOs.Package;
using TravelAgency.API.Models;
using TravelAgency.API.Repositories.Interfaces;
using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Services.Implementations;

public class PackageService : IPackageService
{
    private readonly IPackageRepository _packageRepository;
    private readonly IMapper _mapper;

    public PackageService(IPackageRepository packageRepository, IMapper mapper)
    {
        _packageRepository = packageRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PackageDto>> GetAllAsync()
    {
        var packages = await _packageRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<PackageDto>>(packages);
    }

    public async Task<IEnumerable<PackageDto>> GetByDestinationIdAsync(int destinationId)
    {
        var packages = await _packageRepository.GetByDestinationIdAsync(destinationId);
        return _mapper.Map<IEnumerable<PackageDto>>(packages);
    }

    public async Task<PackageDto?> GetByIdAsync(int id)
    {
        var package = await _packageRepository.GetByIdAsync(id);

        if (package == null)
            return null;

        return _mapper.Map<PackageDto>(package);
    }

    public async Task<PackageDto> CreateAsync(CreatePackageDto dto)
    {
        var package = _mapper.Map<Package>(dto);

        var createdPackage = await _packageRepository.CreateAsync(package);

        return _mapper.Map<PackageDto>(createdPackage);
    }

    public async Task<PackageDto?> UpdateAsync(int id, UpdatePackageDto dto)
    {
        var existingPackage = await _packageRepository.GetByIdAsync(id);

        if (existingPackage == null)
            return null;

        _mapper.Map(dto, existingPackage);

        var updatedPackage = await _packageRepository.UpdateAsync(existingPackage);

        return _mapper.Map<PackageDto>(updatedPackage);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _packageRepository.DeleteAsync(id);
    }
}