using System.ComponentModel.DataAnnotations;

namespace TravelGo.Domain.Entities;

public class PackageImage : BaseEntity
{
    public int PackageId { get; set; }

    [Required]
    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; } = false;

    // Navigation Property
    public Package Package { get; set; } = null!;
}