using System.ComponentModel.DataAnnotations;

namespace TravelAgency.API.DTOs.HotelImage;

public class CreateHotelImageDto
{
    [Required]
    public int HotelId { get; set; }

    [Required]
    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; } = false;
}