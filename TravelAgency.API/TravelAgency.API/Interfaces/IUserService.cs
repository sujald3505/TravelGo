using TravelAgency.API.DTOs.User;

namespace TravelAgency.API.Services.Interfaces;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllAsync();

    Task<UserDto?> GetByIdAsync(int id);

    Task<UserDto?> UpdateAsync(
        int id,
        UpdateUserDto dto);

    Task<UserDto?> UpdateRoleAsync(
        int id,
        UpdateUserRoleDto dto);

    Task<bool> DeleteAsync(int id);
}