using System.ComponentModel.DataAnnotations;

namespace TravelGo.Application.DTOs.PackageImage;

public class CreatePackageImageDto
{
    [Required]
    public int PackageId { get; set; }

    [Required]
    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; } = false;
}