using TravelAgency.API.Models;

namespace TravelAgency.API.Authentication;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}