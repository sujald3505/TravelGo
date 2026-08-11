using System.ComponentModel.DataAnnotations;

namespace TravelAgency.API.DTOs.PackageImage;

public class UpdatePackageImageDto
{
    [Required]
    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; }
}