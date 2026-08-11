using TravelAgency.API.Data;
using TravelAgency.API.DTOs.Inquiry;
using TravelAgency.API.Interfaces;
using TravelAgency.API.Models;

namespace TravelAgency.API.Services;

public class InquiryService : IInquiryService
{
    private readonly ApplicationDbContext _context;

    public InquiryService(ApplicationDbContext context)
    {
        _context = context;
    }

    // =========================================
    // CREATE INQUIRY
    // =========================================

    public async Task<InquiryDto> CreateInquiryAsync(
        CreateInquiryDto dto)
    {
        var inquiry = new Inquiry
        {
            FullName = dto.FullName,
            Email = dto.Email,
            Phone = dto.Phone,
            Subject = dto.Subject,
            Message = dto.Message,
            Status = "New"
        };

        _context.Inquiries.Add(inquiry);

        await _context.SaveChangesAsync();

        return MapToDto(inquiry);
    }

    // =========================================
    // GET ALL INQUIRIES
    // =========================================

    public async Task<IEnumerable<InquiryDto>> GetAllInquiriesAsync()
    {
        return await Task.FromResult(
            _context.Inquiries
                .Where(x => !x.IsDeleted)
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => MapToDto(x))
                .ToList()
        );
    }

    // =========================================
    // GET INQUIRY BY ID
    // =========================================

    public async Task<InquiryDto?> GetInquiryByIdAsync(int id)
    {
        var inquiry = await _context.Inquiries
            .FindAsync(id);

        if (inquiry == null || inquiry.IsDeleted)
        {
            return null;
        }

        return MapToDto(inquiry);
    }

    // =========================================
    // UPDATE STATUS
    // =========================================

    public async Task<InquiryDto?> UpdateStatusAsync(
        int id,
        UpdateInquiryStatusDto dto)
    {
        var inquiry = await _context.Inquiries
            .FindAsync(id);

        if (inquiry == null || inquiry.IsDeleted)
        {
            return null;
        }

        inquiry.Status = dto.Status;
        inquiry.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return MapToDto(inquiry);
    }

    // =========================================
    // DELETE INQUIRY
    // =========================================

    public async Task<bool> DeleteInquiryAsync(int id)
    {
        var inquiry = await _context.Inquiries
            .FindAsync(id);

        if (inquiry == null || inquiry.IsDeleted)
        {
            return false;
        }

        // Soft Delete
        inquiry.IsDeleted = true;
        inquiry.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }

    // =========================================
    // MAPPING
    // =========================================

    private static InquiryDto MapToDto(
        Inquiry inquiry)
    {
        return new InquiryDto
        {
            Id = inquiry.Id,
            FullName = inquiry.FullName,
            Email = inquiry.Email,
            Phone = inquiry.Phone,
            Subject = inquiry.Subject,
            Message = inquiry.Message,
            Status = inquiry.Status,
            CreatedAt = inquiry.CreatedAt
        };
    }
}