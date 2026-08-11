using System.ComponentModel.DataAnnotations;

namespace TravelAgency.API.DTOs.Hotel;

public class CreateHotelDto
{
    [Required]
    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    [Required]
    [MaxLength(300)]
    public string Address { get; set; } = string.Empty;

    [Range(1, 5)]
    public int StarRating { get; set; }

    [Range(0, 999999)]
    public decimal PricePerNight { get; set; }

    public bool IsAvailable { get; set; } = true;

    [Required]
    public int DestinationId { get; set; }
}