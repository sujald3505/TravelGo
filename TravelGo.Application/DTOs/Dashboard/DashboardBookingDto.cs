namespace TravelGo.Application.DTOs.Dashboard
{
    public class DashboardBookingDto
    {
        public int Id { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string DestinationName { get; set; } = string.Empty;

        public string PackageName { get; set; } = string.Empty;

        public string HotelName { get; set; } = string.Empty;

        public decimal TotalAmount { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}
