namespace TravelAgency.API.Services.Interfaces;

public interface IImageService
{
    Task<string> UploadImageAsync(IFormFile file, string folderName);

    Task DeleteImageAsync(string imagePath);
}