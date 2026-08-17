namespace TravelGo.Application.DTOs.Dashboard
{
    public class DashboardDto
    {
        public int TotalUsers { get; set; }

        public int TotalDestinations { get; set; }

        public int TotalPackages { get; set; }

        public int TotalHotels { get; set; }

        public int TotalBookings { get; set; }

        public decimal TotalRevenue { get; set; }

        public List<DashboardBookingDto> RecentBookings { get; set; }
            = new();
    }
}
