using System.ComponentModel.DataAnnotations;

namespace TravelAgency.API.DTOs.HotelImage;

public class UpdateHotelImageDto
{
    [Required]
    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; }
}