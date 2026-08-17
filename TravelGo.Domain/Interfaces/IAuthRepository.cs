using TravelGo.Domain.Entities;

namespace TravelGo.Domain.Interfaces;

public interface IAuthRepository
{
    Task<User?> GetUserByEmailAsync(string email);

    Task<bool> EmailExistsAsync(string email);


    Task<Role?> GetRoleByNameAsync(string roleName);

    Task AddUserAsync(User user);

    Task SaveChangesAsync();
}