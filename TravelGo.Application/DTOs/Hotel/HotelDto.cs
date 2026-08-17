using TravelGo.Application.DTOs.HotelImage;

namespace TravelGo.Application.DTOs.Hotel;

public class HotelDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public int StarRating { get; set; }

    public decimal PricePerNight { get; set; }

    public bool IsAvailable { get; set; }

    public int DestinationId { get; set; }

    public string DestinationName { get; set; } = string.Empty;

    public List<HotelImageDto> HotelImages { get; set; } = new();
}