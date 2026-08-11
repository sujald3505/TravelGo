namespace TravelAgency.API.DTOs.PackageImage;

public class PackageImageDto
{
    public int Id { get; set; }

    public int PackageId { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

    public bool IsPrimary { get; set; }
}