using TravelGo.Domain.Entities;

namespace TravelGo.Application.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}