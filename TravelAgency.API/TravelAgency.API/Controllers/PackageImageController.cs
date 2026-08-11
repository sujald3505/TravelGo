using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.DTOs.PackageImage;
using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PackageImageController : ControllerBase
{
    private readonly IPackageImageService _service;

    public PackageImageController(
        IPackageImageService service)
    {
        _service = service;
    }

    // GET: api/PackageImage/package/1
    [HttpGet("package/{packageId}")]
    public async Task<IActionResult> GetByPackageId(
        int packageId)
    {
        var images =
            await _service.GetByPackageIdAsync(packageId);

        return Ok(images);
    }

    // GET: api/PackageImage/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var image =
            await _service.GetByIdAsync(id);

        if (image == null)
            return NotFound();

        return Ok(image);
    }

    // POST: api/PackageImage
    [HttpPost]
    public async Task<IActionResult> Create(
        CreatePackageImageDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created =
            await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created
        );
    }

    // PUT: api/PackageImage/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdatePackageImageDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated =
            await _service.UpdateAsync(id, dto);

        if (updated == null)
            return NotFound();

        return Ok(updated);
    }

    // DELETE: api/PackageImage/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted =
            await _service.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}