using Microsoft.AspNetCore.Http;

namespace TravelGo.Application.DTOs.Image;

public class ImageUploadDto
{
    public IFormFile File { get; set; } = null!;

    public string Folder { get; set; } = string.Empty;

    public bool Compress { get; set; }

}