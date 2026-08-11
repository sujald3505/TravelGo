using System.ComponentModel.DataAnnotations;

namespace TravelAgency.API.Models;

public class Hotel : BaseEntity
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

    public int DestinationId { get; set; }
    [Range(1, 10)]
    public int TotalRooms { get; set; }

    [MaxLength(1000)]
    public string Amenities { get; set; } = string.Empty;


    // Navigation Properties
    public Destination Destination { get; set; } = null!;

    public ICollection<HotelImage> HotelImages { get; set; }
        = new List<HotelImage>();

   

    
}