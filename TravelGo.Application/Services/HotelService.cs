using AutoMapper;
using TravelGo.Application.DTOs.Hotel;
using TravelGo.Domain.Entities;
using TravelGo.Domain.Interfaces;
using TravelGo.Application.Interfaces;

namespace TravelGo.Application.Services;

public class HotelService : IHotelService
{
    private readonly IHotelRepository _hotelRepository;
    private readonly IMapper _mapper;

    public HotelService(IHotelRepository hotelRepository, IMapper mapper)
    {
        _hotelRepository = hotelRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<HotelDto>> GetAllAsync()
    {
        var hotels = await _hotelRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<HotelDto>>(hotels);
    }

    public async Task<IEnumerable<HotelDto>> GetByDestinationIdAsync(int destinationId)
    {
        var hotels = await _hotelRepository.GetByDestinationIdAsync(destinationId);
        return _mapper.Map<IEnumerable<HotelDto>>(hotels);
    }

    public async Task<HotelDto?> GetByIdAsync(int id)
    {
        var hotel = await _hotelRepository.GetByIdAsync(id);

        if (hotel == null)
            return null;

        return _mapper.Map<HotelDto>(hotel);
    }

    public async Task<HotelDto> CreateAsync(CreateHotelDto dto)
    {
        var hotel = _mapper.Map<Hotel>(dto);

        var createdHotel = await _hotelRepository.CreateAsync(hotel);

        return _mapper.Map<HotelDto>(createdHotel);
    }

    public async Task<HotelDto?> UpdateAsync(int id, UpdateHotelDto dto)
    {
        var existingHotel = await _hotelRepository.GetByIdAsync(id);

        if (existingHotel == null)
            return null;

        _mapper.Map(dto, existingHotel);

        var updatedHotel = await _hotelRepository.UpdateAsync(existingHotel);

        return _mapper.Map<HotelDto>(updatedHotel);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _hotelRepository.DeleteAsync(id);
    }
}