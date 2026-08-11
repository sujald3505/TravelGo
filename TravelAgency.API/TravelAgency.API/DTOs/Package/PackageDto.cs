using TravelAgency.API.DTOs.PackageImage;

namespace TravelAgency.API.DTOs.Package;

public class PackageDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public int Duration { get; set; }

    public int MaxPeople { get; set; }

    public bool IsFeatured { get; set; }

    public int DestinationId { get; set; }

    public string DestinationName { get; set; } = string.Empty;

    public List<PackageImageDto> PackageImages { get; set; } = new();
}