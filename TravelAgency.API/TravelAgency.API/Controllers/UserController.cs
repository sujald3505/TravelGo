using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.DTOs.User;
using TravelAgency.API.Services.Interfaces;

namespace TravelAgency.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(
        IUserService userService)
    {
        _userService = userService;
    }


    // GET: api/User
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users =
            await _userService.GetAllAsync();

        return Ok(users);
    }


    // GET: api/User/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
        int id)
    {
        var user =
            await _userService.GetByIdAsync(id);

        if (user == null)
            return NotFound("User not found.");

        return Ok(user);
    }


    // PUT: api/User/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateUserDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated =
            await _userService.UpdateAsync(
                id,
                dto);

        if (updated == null)
            return NotFound("User not found.");

        return Ok(updated);
    }


    // PUT: api/User/1/role
    [HttpPut("{id}/role")]
    public async Task<IActionResult> UpdateRole(
        int id,
        UpdateUserRoleDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (dto.RoleId <= 0)
            return BadRequest("Invalid RoleId.");

        var updated =
            await _userService.UpdateRoleAsync(
                id,
                dto);

        if (updated == null)
            return NotFound("User not found.");

        return Ok(updated);
    }


    // DELETE: api/User/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(
        int id)
    {
        var deleted =
            await _userService.DeleteAsync(id);

        if (!deleted)
            return NotFound("User not found.");

        return Ok(new
        {
            message =
                "User deleted successfully."
        });
    }
}