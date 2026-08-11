namespace TravelAgency.API.DTOs.Booking;

public class BookingDto
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string UserName { get; set; } = string.Empty;

    public int DestinationId { get; set; }

    public string DestinationName { get; set; } = string.Empty;

    public int HotelId { get; set; }

    public string HotelName { get; set; } = string.Empty;

    public int PackageId { get; set; }

    public string PackageName { get; set; } = string.Empty;

    public DateTime BookingDate { get; set; }

    public DateTime TravelDate { get; set; }

    public int NumberOfPeople { get; set; }

    public decimal TotalAmount { get; set; }

    public string Status { get; set; } = string.Empty;
}