namespace TravelGo.Domain.Entities;

public class Booking : BaseEntity
{
    public int UserId { get; set; }

    public int DestinationId { get; set; }

    public int PackageId { get; set; }

    public int HotelId { get; set; }
    public DateTime BookingDate { get; set; } = DateTime.UtcNow;

    public DateTime TravelDate { get; set; }

    public int NumberOfPeople { get; set; }

    public decimal TotalAmount { get; set; }

    public string Status { get; set; } = "Pending";

    // Navigation Properties
    public User User { get; set; } = null!;

    public Destination Destination { get; set; } = null!;

    public Package Package { get; set; } = null!;

    public Hotel Hotel { get; set; } = null!;
   
}