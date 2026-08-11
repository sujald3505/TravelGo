using System.ComponentModel.DataAnnotations;

namespace TravelAgency.API.DTOs.Booking;

public class CreateBookingDto
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public int DestinationId { get; set; }

    [Required]
    public int HotelId { get; set; }

    [Required]
    public int PackageId { get; set; }

    [Required]
    public DateTime TravelDate { get; set; }

    [Range(1, 100)]
    public int NumberOfPeople { get; set; }

    [Range(0.01, double.MaxValue)]
    public decimal TotalAmount { get; set; }
}