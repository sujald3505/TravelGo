using TravelGo.Application.DTOs.Inquiry;

namespace TravelGo.Application.Interfaces;

public interface IInquiryService
{
    Task<InquiryDto> CreateInquiryAsync(CreateInquiryDto dto);

    Task<IEnumerable<InquiryDto>> GetAllInquiriesAsync();

    Task<InquiryDto?> GetInquiryByIdAsync(int id);

    Task<InquiryDto?> UpdateStatusAsync(
        int id,
        UpdateInquiryStatusDto dto
    );

    Task<bool> DeleteInquiryAsync(int id);
}