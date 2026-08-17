namespace TravelGo.Application.DTOs.HotelImage;

public class HotelImageDto
{
    public int Id { get; set; }

    public int HotelId { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; }
}