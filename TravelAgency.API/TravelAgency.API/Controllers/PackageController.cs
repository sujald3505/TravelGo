using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.DTOs.Package;
using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PackageController : ControllerBase
{
    private readonly IPackageService _packageService;

    public PackageController(IPackageService packageService)
    {
        _packageService = packageService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PackageDto>>> GetAll()
    {
        var packages = await _packageService.GetAllAsync();
        return Ok(packages);
    }

    // NEW API
    [HttpGet("destination/{destinationId}")]
    public async Task<ActionResult<IEnumerable<PackageDto>>> GetByDestination(int destinationId)
    {
        var packages = await _packageService.GetByDestinationIdAsync(destinationId);

        return Ok(packages);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PackageDto>> GetById(int id)
    {
        var package = await _packageService.GetByIdAsync(id);

        if (package == null)
            return NotFound();

        return Ok(package);
    }

    [HttpPost]
    public async Task<ActionResult<PackageDto>> Create(CreatePackageDto dto)
    {
        var createdPackage = await _packageService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = createdPackage.Id },
            createdPackage);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PackageDto>> Update(int id, UpdatePackageDto dto)
    {
        var updatedPackage = await _packageService.UpdateAsync(id, dto);

        if (updatedPackage == null)
            return NotFound();

        return Ok(updatedPackage);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _packageService.DeleteAsync(id);

        if (!deleted)
            return NotFound("Package Not Found.");

        return Ok(new
        {
            message = "Package deleted successfully."
        });
    }
}