using System.ComponentModel.DataAnnotations;

namespace TravelGo.Domain.Entities;

public class Package : BaseEntity
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    [Range(0, 999999)]
    public decimal Price { get; set; }

    [Range(1, 365)]
    public int Duration { get; set; }

    [Range(1, 100)]
    public int MaxPeople { get; set; }

    public bool IsFeatured { get; set; } = false;

    public int DestinationId { get; set; }

    [MaxLength(500)]
    public string Thumbnail { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Included { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Excluded { get; set; } = string.Empty;

    // Navigation Properties
    public Destination Destination { get; set; } = null!;

    public ICollection<PackageImage> PackageImages { get; set; }
        = new List<PackageImage>();

    
}