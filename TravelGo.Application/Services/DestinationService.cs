using AutoMapper;
using TravelGo.Application.DTOs.Destination;
using TravelGo.Application.Interfaces;
using TravelGo.Domain.Interfaces;
using TravelGo.Domain.Entities;

namespace TravelGo.Application.Services;

public class DestinationService : IDestinationService
{
    private readonly IDestinationRepository _repository;
    private readonly IMapper _mapper;

    public DestinationService(
        IDestinationRepository repository,
        IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<DestinationDto>> GetAllAsync()
    {
        var destinations = await _repository.GetAllAsync();

        return _mapper.Map<IEnumerable<DestinationDto>>(destinations);
    }

    public async Task<DestinationDto?> GetByIdAsync(int id)
    {
        var destination = await _repository.GetByIdAsync(id);

        if (destination == null)
            return null;

        return _mapper.Map<DestinationDto>(destination);
    }

    public async Task<DestinationDto> CreateAsync(CreateDestinationDto dto)
    {
        var destination = _mapper.Map<Destination>(dto);

        var created = await _repository.CreateAsync(destination);

        return _mapper.Map<DestinationDto>(created);
    }

    public async Task<DestinationDto?> UpdateAsync(
        int id,
        UpdateDestinationDto dto)
    {
        var destination = await _repository.GetByIdAsync(id);

        if (destination == null)
            return null;

        _mapper.Map(dto, destination);

        destination.UpdatedAt = DateTime.UtcNow;

        await _repository.UpdateAsync(destination);

        return _mapper.Map<DestinationDto>(destination);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}