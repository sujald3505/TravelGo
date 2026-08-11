using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.DTOs.HotelImage;
using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HotelImageController : ControllerBase
{
    private readonly IHotelImageService _service;

    public HotelImageController(IHotelImageService service)
    {
        _service = service;
    }

    // GET: api/HotelImage
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var images = await _service.GetAllAsync();

        return Ok(images);
    }


    // GET: api/HotelImage/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var image = await _service.GetByIdAsync(id);

        if (image == null)
            return NotFound(new
            {
                message = "Hotel image not found."
            });

        return Ok(image);
    }


    // GET: api/HotelImage/hotel/1
    [HttpGet("hotel/{hotelId}")]
    public async Task<IActionResult> GetByHotelId(
        int hotelId)
    {
        var images =
            await _service.GetByHotelIdAsync(hotelId);

        return Ok(images);
    }


    // POST: api/HotelImage
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateHotelImageDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var image =
            await _service.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = image.Id },
            image);
    }


    // PUT: api/HotelImage/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] UpdateHotelImageDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var image =
            await _service.UpdateAsync(id, dto);

        if (image == null)
            return NotFound(new
            {
                message = "Hotel image not found."
            });

        return Ok(image);
    }


    // DELETE: api/HotelImage/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result =
            await _service.DeleteAsync(id);

        if (!result)
            return NotFound(new
            {
                message = "Hotel image not found."
            });

        return Ok(new
        {
            message = "Hotel image deleted successfully."
        });
    }
}