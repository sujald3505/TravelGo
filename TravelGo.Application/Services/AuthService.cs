using TravelGo.Application.Interfaces;
using TravelGo.Domain.Interfaces;
using TravelGo.Application.DTOs.Auth;
using TravelGo.Domain.Entities;
using TravelGo.Application.Helpers;
using BCrypt.Net;


namespace TravelGo.Application.Services;

public class AuthService : IAuthService
{
    private readonly IAuthRepository _authRepository;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthService(
    IAuthRepository authRepository,
    IJwtTokenGenerator jwtTokenGenerator)
    {
        _authRepository = authRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto model)
    {
        if (await _authRepository.EmailExistsAsync(model.Email))
        {
            return new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Email already exists."
            };
        }

        var customerRole = await _authRepository.GetRoleByNameAsync(AppRoles.Customer);

        if (customerRole == null)
        {
            return new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Customer role not found."
            };
        }

        var user = new User
        {
            FirstName = model.FirstName,
            LastName = model.LastName,
            Email = model.Email,
            PhoneNumber = model.PhoneNumber,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
            RoleId = customerRole.Id
        };

        await _authRepository.AddUserAsync(user);
        await _authRepository.SaveChangesAsync();

        return new AuthResponseDto
        {
            IsSuccess = true,
            Message = "Registration successful."
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto model)
    {
        // Check user exists
        var user = await _authRepository.GetUserByEmailAsync(model.Email);

        if (user == null)
        {
            return new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Invalid email or password."
            };
        }

        // Verify password
        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(
            model.Password,
            user.PasswordHash);

        if (!isPasswordValid)
        {
            return new AuthResponseDto
            {
                IsSuccess = false,
                Message = "Invalid email or password."
            };
        }

        // Generate JWT Token
        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthResponseDto
        {
            IsSuccess = true,
            Message = "Login successful.",

            Token = token,

            Expiration = DateTime.UtcNow.AddDays(7),

            UserId = user.Id,

            FirstName = user.FirstName,

            LastName = user.LastName,

            Email = user.Email,

            Role = user.Role!.Name
        };
    }


}