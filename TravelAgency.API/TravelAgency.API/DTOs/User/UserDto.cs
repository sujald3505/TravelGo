namespace TravelAgency.API.DTOs.User;

public class UserDto
{
    public int Id { get; set; }

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public bool IsActive { get; set; }

    public int RoleId { get; set; }

    public string RoleName { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}