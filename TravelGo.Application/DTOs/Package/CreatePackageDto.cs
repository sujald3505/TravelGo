using System.ComponentModel.DataAnnotations;

namespace TravelGo.Application.DTOs.Package;

public class CreatePackageDto
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

    [Required]
    public int DestinationId { get; set; }
}