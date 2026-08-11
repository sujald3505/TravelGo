using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Services.Implementations;

public class ImageService : IImageService
{
    private readonly IWebHostEnvironment _environment;

    private readonly string[] _allowedExtensions =
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    };

    private const long MaxFileSize = 5 * 1024 * 1024; // 5 MB

    public ImageService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<string> UploadImageAsync(IFormFile file, string folderName)
    {
        if (file == null || file.Length == 0)
            throw new Exception("Please select an image.");

        if (file.Length > MaxFileSize)
            throw new Exception("Image size cannot exceed 5 MB.");

        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!_allowedExtensions.Contains(extension))
            throw new Exception("Only JPG, JPEG, PNG and WEBP images are allowed.");

        var fileName = $"{Guid.NewGuid()}{extension}";

        var folderPath = Path.Combine(
            _environment.WebRootPath,
            "uploads",
            folderName);

        if (!Directory.Exists(folderPath))
            Directory.CreateDirectory(folderPath);

        var filePath = Path.Combine(folderPath, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);

        await file.CopyToAsync(stream);

        return $"/uploads/{folderName}/{fileName}";
    }

    public Task DeleteImageAsync(string imagePath)
    {
        if (string.IsNullOrWhiteSpace(imagePath))
            return Task.CompletedTask;

        imagePath = imagePath.TrimStart('/');

        var fullPath = Path.Combine(
            _environment.WebRootPath,
            imagePath.Replace("/", Path.DirectorySeparatorChar.ToString()));

        if (File.Exists(fullPath))
        {
            File.Delete(fullPath);
        }

        return Task.CompletedTask;
    }
}