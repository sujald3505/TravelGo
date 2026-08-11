using System.ComponentModel.DataAnnotations;

namespace TravelAgency.API.DTOs.Booking;

public class UpdateBookingDto
{
    [Required]
    public DateTime TravelDate { get; set; }

    [Range(1, 100)]
    public int NumberOfPeople { get; set; }

    [Range(0.01, double.MaxValue)]
    public decimal TotalAmount { get; set; }

    [Required]
    public string Status { get; set; } = string.Empty;
}