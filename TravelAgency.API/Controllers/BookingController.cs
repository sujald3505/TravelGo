using Microsoft.AspNetCore.Mvc;
using TravelGo.Application.DTOs.Booking;
using TravelGo.Application.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace TravelAgency.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    // GET: api/Booking
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var bookings = await _bookingService.GetAllAsync();
        return Ok(bookings);
    }

    [Authorize]
    [HttpGet("my-bookings")]
    public async Task<IActionResult> GetMyBookings()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!int.TryParse(userIdClaim, out int userId))
            return Unauthorized();

        var bookings = await _bookingService.GetByUserIdAsync(userId);

        return Ok(bookings);
    }


    // GET: api/Booking/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var booking = await _bookingService.GetByIdAsync(id);

        if (booking == null)
            return NotFound("Booking not found.");

        return Ok(booking);
    }

    // POST: api/Booking
    [HttpPost]
    public async Task<IActionResult> Create(CreateBookingDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _bookingService.CreateAsync(dto);

        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    // PUT: api/Booking/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateBookingDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated = await _bookingService.UpdateAsync(id, dto);

        if (updated == null)
            return NotFound("Booking not found.");

        return Ok(updated);
    }
    // PUT: api/Booking/5/status
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(
        int id,
        UpdateBookingStatusDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Status))
            return BadRequest("Status is required.");

        var allowedStatuses = new[]
        {
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled"
    };

        if (!allowedStatuses.Contains(
            dto.Status,
            StringComparer.OrdinalIgnoreCase))
        {
            return BadRequest(
                "Invalid booking status.");
        }

        var updated =
            await _bookingService.UpdateStatusAsync(
                id,
                dto.Status);

        if (updated == null)
            return NotFound(
                "Booking not found.");

        return Ok(new
        {
            message =
                "Booking status updated successfully.",

            bookingId = updated.Id,

            status = updated.Status
        });
    }
    // DELETE: api/Booking/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _bookingService.DeleteAsync(id);

        if (!deleted)
            return NotFound("Booking not found.");

        return Ok(new
        {
            message = "Booking deleted successfully."
        });
    }
}