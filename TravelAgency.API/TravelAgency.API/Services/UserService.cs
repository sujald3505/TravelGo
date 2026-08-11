using AutoMapper;
using TravelAgency.API.DTOs.User;
using TravelAgency.API.Repositories.Interfaces;
using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Services.Implementations;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(
        IUserRepository userRepository,
        IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        var users =
            await _userRepository.GetAllAsync();

        return _mapper.Map<IEnumerable<UserDto>>(
            users);
    }

    public async Task<UserDto?> GetByIdAsync(
        int id)
    {
        var user =
            await _userRepository.GetByIdAsync(id);

        if (user == null)
            return null;

        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto?> UpdateAsync(
        int id,
        UpdateUserDto dto)
    {
        var user =
            await _userRepository.GetByIdAsync(id);

        if (user == null)
            return null;

        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.Email = dto.Email;
        user.PhoneNumber = dto.PhoneNumber;
        user.IsActive = dto.IsActive;

        var updated =
            await _userRepository.UpdateAsync(user);

        return _mapper.Map<UserDto>(updated);
    }

    public async Task<UserDto?> UpdateRoleAsync(
        int id,
        UpdateUserRoleDto dto)
    {
        var user =
            await _userRepository.GetByIdAsync(id);

        if (user == null)
            return null;

        user.RoleId = dto.RoleId;

        var updated =
            await _userRepository.UpdateAsync(user);

        return _mapper.Map<UserDto>(updated);
    }

    public async Task<bool> DeleteAsync(
        int id)
    {
        return await _userRepository.DeleteAsync(id);
    }
}