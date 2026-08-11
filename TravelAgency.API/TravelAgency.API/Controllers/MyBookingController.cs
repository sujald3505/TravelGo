using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MyBookingController : ControllerBase
{
    private readonly IMyBookingService _myBookingService;

    public MyBookingController(IMyBookingService myBookingService)
    {
        _myBookingService = myBookingService;
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetAllByUser(int userId)
    {
        var bookings = await _myBookingService.GetAllByUserIdAsync(userId);

        return Ok(bookings);
    }

    [HttpGet("{bookingId}")]
    public async Task<IActionResult> GetDetails(int bookingId)
    {
        var booking = await _myBookingService.GetDetailsAsync(bookingId);

        if (booking == null)
            return NotFound();

        return Ok(booking);
    }
}