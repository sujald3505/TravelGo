using Microsoft.EntityFrameworkCore;
using TravelGo.Infrastructure.Data;
using TravelGo.Domain.Entities;
using TravelGo.Domain.Interfaces;

namespace TravelGo.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users
            .Include(u => u.Role)
            .Where(u => !u.IsDeleted)
            .OrderByDescending(u => u.CreatedAt)
            .ToListAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(
                u => u.Id == id &&
                     !u.IsDeleted);
    }

    public async Task<User?> GetByEmailAsync(
        string email)
    {
        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(
                u => u.Email == email &&
                     !u.IsDeleted);
    }

    public async Task<User?> UpdateAsync(
        User user)
    {
        _context.Users.Update(user);

        await _context.SaveChangesAsync();

        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(
                u => u.Id == user.Id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var user =
            await _context.Users
                .FirstOrDefaultAsync(
                    u => u.Id == id &&
                         !u.IsDeleted);

        if (user == null)
            return false;

        // Soft delete
        user.IsDeleted = true;

        await _context.SaveChangesAsync();

        return true;
    }
}