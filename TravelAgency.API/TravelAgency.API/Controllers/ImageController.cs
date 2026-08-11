using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.DTOs.Image;
using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ImageController : ControllerBase
{
    private readonly IImageService _imageService;

    public ImageController(IImageService imageService)
    {
        _imageService = imageService;
    }

    [HttpPost("upload/destination")]
    public async Task<IActionResult> UploadDestinationImage([FromForm] ImageUploadDto dto)
    {
        var imageUrl = await _imageService.UploadImageAsync(dto.File, "destinations");

        return Ok(new
        {
            imageUrl
        });
    }

    [HttpPost("upload/package")]
    public async Task<IActionResult> UploadPackageImage([FromForm] ImageUploadDto dto)
    {
        var imageUrl = await _imageService.UploadImageAsync(dto.File, "packages");

        return Ok(new
        {
            imageUrl
        });
    }

    [HttpPost("upload/hotel")]
    public async Task<IActionResult> UploadHotelImage([FromForm] ImageUploadDto dto)
    {
        var imageUrl = await _imageService.UploadImageAsync(dto.File, "hotels");

        return Ok(new
        {
            imageUrl
        });
    }
}