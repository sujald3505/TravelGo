using System.ComponentModel.DataAnnotations;

namespace TravelGo.Domain.Entities;

public class HotelImage : BaseEntity
{
    public int HotelId { get; set; }

    [Required]
    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; } = false;

    // Navigation Property
    public Hotel Hotel { get; set; } = null!;
}