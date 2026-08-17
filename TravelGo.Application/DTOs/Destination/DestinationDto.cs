namespace TravelGo.Application.DTOs.Destination
{
    public class DestinationDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

       

        public double Rating { get; set; }

        public string Thumbnail { get; set; } = string.Empty;

        public bool IsPopular { get; set; }
    }
}
