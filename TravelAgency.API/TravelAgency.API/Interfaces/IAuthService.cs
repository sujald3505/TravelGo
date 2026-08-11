using TravelAgency.API.DTOs.Auth;

namespace TravelAgency.API.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto model);

    Task<AuthResponseDto> LoginAsync(LoginDto model);
}