using System.ComponentModel.DataAnnotations;

namespace TravelGo.Domain.Entities;

public class Destination : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Country { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string City { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

   

    [Range(0, 5)]
    public double Rating { get; set; }

    [MaxLength(500)]
    public string Thumbnail { get; set; } = string.Empty;

    public bool IsPopular { get; set; } = false;

    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public ICollection<Package> Packages { get; set; } = new List<Package>();

    public ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();
}