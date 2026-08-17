using Microsoft.AspNetCore.Mvc;
using TravelGo.Application.DTOs.Hotel;
using TravelGo.Application.Interfaces;

namespace TravelAgency.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HotelController : ControllerBase
{
    private readonly IHotelService _hotelService;

    public HotelController(IHotelService hotelService)
    {
        _hotelService = hotelService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<HotelDto>>> GetAll()
    {
        var hotels = await _hotelService.GetAllAsync();
        return Ok(hotels);
    }

    // NEW API
    [HttpGet("destination/{destinationId}")]
    public async Task<ActionResult<IEnumerable<HotelDto>>> GetByDestination(int destinationId)
    {
        var hotels = await _hotelService.GetByDestinationIdAsync(destinationId);

        return Ok(hotels);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<HotelDto>> GetById(int id)
    {
        var hotel = await _hotelService.GetByIdAsync(id);

        if (hotel == null)
            return NotFound();

        return Ok(hotel);
    }

    [HttpPost]
    public async Task<ActionResult<HotelDto>> Create(CreateHotelDto dto)
    {
        var createdHotel = await _hotelService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = createdHotel.Id },
            createdHotel);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<HotelDto>> Update(int id, UpdateHotelDto dto)
    {
        var updatedHotel = await _hotelService.UpdateAsync(id, dto);

        if (updatedHotel == null)
            return NotFound();

        return Ok(updatedHotel);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _hotelService.DeleteAsync(id);

        if (!deleted)
            return NotFound("Hotel Not Found.");

        return Ok(new
        {
            message = "Hotel deleted successfully."
        });
    }
}