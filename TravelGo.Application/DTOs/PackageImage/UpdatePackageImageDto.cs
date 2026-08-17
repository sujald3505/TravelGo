using System.ComponentModel.DataAnnotations;

namespace TravelGo.Application.DTOs.PackageImage;

public class UpdatePackageImageDto
{
    [Required]
    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; }
}