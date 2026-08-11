using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.DTOs.Inquiry;
using TravelAgency.API.Interfaces;

namespace TravelAgency.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InquiryController : ControllerBase
{
    private readonly IInquiryService _inquiryService;

    public InquiryController(IInquiryService inquiryService)
    {
        _inquiryService = inquiryService;
    }

    // =========================================
    // CREATE INQUIRY
    // POST: api/Inquiry
    // =========================================

    [HttpPost]
    public async Task<IActionResult> CreateInquiry(
        [FromBody] CreateInquiryDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var inquiry =
            await _inquiryService.CreateInquiryAsync(dto);

        return Ok(inquiry);
    }

    // =========================================
    // GET ALL INQUIRIES
    // GET: api/Inquiry
    // =========================================

    [HttpGet]
    public async Task<IActionResult> GetAllInquiries()
    {
        var inquiries =
            await _inquiryService.GetAllInquiriesAsync();

        return Ok(inquiries);
    }

    // =========================================
    // GET INQUIRY BY ID
    // GET: api/Inquiry/{id}
    // =========================================

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetInquiryById(int id)
    {
        var inquiry =
            await _inquiryService.GetInquiryByIdAsync(id);

        if (inquiry == null)
        {
            return NotFound(new
            {
                message = "Inquiry not found."
            });
        }

        return Ok(inquiry);
    }

    // =========================================
    // UPDATE STATUS
    // PUT: api/Inquiry/{id}/status
    // =========================================

    [HttpPut("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(
        int id,
        [FromBody] UpdateInquiryStatusDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Status))
        {
            return BadRequest(new
            {
                message = "Status is required."
            });
        }

        var inquiry =
            await _inquiryService.UpdateStatusAsync(id, dto);

        if (inquiry == null)
        {
            return NotFound(new
            {
                message = "Inquiry not found."
            });
        }

        return Ok(inquiry);
    }

    // =========================================
    // DELETE INQUIRY
    // DELETE: api/Inquiry/{id}
    // =========================================

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteInquiry(int id)
    {
        var deleted =
            await _inquiryService.DeleteInquiryAsync(id);

        if (!deleted)
        {
            return NotFound(new
            {
                message = "Inquiry not found."
            });
        }

        return Ok(new
        {
            message = "Inquiry deleted successfully."
        });
    }
}