using TravelGo.Application.DTOs.Auth;

namespace TravelGo.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto model);

    Task<AuthResponseDto> LoginAsync(LoginDto model);
}