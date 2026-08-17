using System.ComponentModel.DataAnnotations;

namespace TravelGo.Application.DTOs.Destination
{
    public class UpdateDestinationDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Country { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string Description { get; set; } = string.Empty;

       

        public double Rating { get; set; }

        public string Thumbnail { get; set; } = string.Empty;

        public bool IsPopular { get; set; }
    }
}
