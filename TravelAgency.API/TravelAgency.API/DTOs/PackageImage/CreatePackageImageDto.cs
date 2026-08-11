using System.ComponentModel.DataAnnotations;

namespace TravelAgency.API.DTOs.PackageImage;

public class CreatePackageImageDto
{
    [Required]
    public int PackageId { get; set; }

    [Required]
    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; } = false;
}