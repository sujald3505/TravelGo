using TravelGo.Application.DTOs.HotelImage;
using TravelGo.Domain.Entities;
using TravelGo.Domain.Interfaces;
using TravelGo.Application.Interfaces;

namespace TravelGo.Application.Services;

public class HotelImageService : IHotelImageService
{
    private readonly IHotelImageRepository _repository;

    public HotelImageService(
        IHotelImageRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<HotelImageDto>> GetAllAsync()
    {
        var images = await _repository.GetAllAsync();

        return images.Select(MapToDto);
    }

    public async Task<HotelImageDto?> GetByIdAsync(int id)
    {
        var image = await _repository.GetByIdAsync(id);

        if (image == null)
            return null;

        return MapToDto(image);
    }

    public async Task<IEnumerable<HotelImageDto>> GetByHotelIdAsync(
        int hotelId)
    {
        var images =
            await _repository.GetByHotelIdAsync(hotelId);

        return images.Select(MapToDto);
    }

    public async Task<HotelImageDto> CreateAsync(
        CreateHotelImageDto dto)
    {
        var hotelImage = new HotelImage
        {
            HotelId = dto.HotelId,
            ImageUrl = dto.ImageUrl,
            IsPrimary = dto.IsPrimary
        };

        // If this image is primary,
        // remove primary status from other images.
        if (dto.IsPrimary)
        {
            var existingImages =
                await _repository.GetByHotelIdAsync(dto.HotelId);

            foreach (var image in existingImages)
            {
                image.IsPrimary = false;

                await _repository.UpdateAsync(image);
            }
        }

        var created =
            await _repository.CreateAsync(hotelImage);

        return MapToDto(created);
    }

    public async Task<HotelImageDto?> UpdateAsync(
        int id,
        UpdateHotelImageDto dto)
    {
        var existing =
            await _repository.GetByIdAsync(id);

        if (existing == null)
            return null;

        if (dto.IsPrimary)
        {
            var hotelImages =
                await _repository
                    .GetByHotelIdAsync(existing.HotelId);

            foreach (var image in hotelImages)
            {
                image.IsPrimary = false;

                await _repository.UpdateAsync(image);
            }
        }

        existing.ImageUrl = dto.ImageUrl;
        existing.IsPrimary = dto.IsPrimary;

        var updated =
            await _repository.UpdateAsync(existing);

        if (updated == null)
            return null;

        return MapToDto(updated);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }

    private static HotelImageDto MapToDto(
        HotelImage image)
    {
        return new HotelImageDto
        {
            Id = image.Id,
            HotelId = image.HotelId,
            ImageUrl = image.ImageUrl,
            IsPrimary = image.IsPrimary
        };
    }
}