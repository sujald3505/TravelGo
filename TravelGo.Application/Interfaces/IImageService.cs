using Microsoft.AspNetCore.Http;
namespace TravelGo.Application.Interfaces;

public interface IImageService
{
    Task<string> UploadImageAsync(IFormFile file, string folderName);

    Task DeleteImageAsync(string imagePath);
}