using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.DTOs.Destination;
using TravelAgency.API.Interfaces;

namespace TravelAgency.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DestinationController : ControllerBase
{
    private readonly IDestinationService _destinationService;

    public DestinationController(IDestinationService destinationService)
    {
        _destinationService = destinationService;
    }

    // GET: api/Destination
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var destinations = await _destinationService.GetAllAsync();
        return Ok(destinations);
    }

    // GET: api/Destination/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var destination = await _destinationService.GetByIdAsync(id);

        if (destination == null)
            return NotFound("Destination not found.");

        return Ok(destination);
    }

    // POST: api/Destination
    [HttpPost]
    public async Task<IActionResult> Create(CreateDestinationDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _destinationService.CreateAsync(dto);

        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    // PUT: api/Destination/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateDestinationDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated = await _destinationService.UpdateAsync(id, dto);

        if (updated == null)
            return NotFound("Destination not found.");

        return Ok(updated);
    }

    // DELETE: api/Destination/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _destinationService.DeleteAsync(id);

        if (!deleted)
            return NotFound("Destination not found.");

        return Ok(new
        {
            message = "Destination deleted successfully."
        });
    }
}