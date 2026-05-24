using Bookora.API.Data;
using Bookora.API.DTOs.Auth;
using Bookora.API.Models;
using Bookora.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bookora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;

    public AuthController(
        AppDbContext context,
        TokenService tokenService
    )
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var exists = await _context.Users
            .AnyAsync(x => x.Email == dto.Email);

        if (exists)
        {
            return BadRequest("Email already exists");
        }

        var user = new User
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);

        var business = new Bookora.API.Models.Business
        {
            Id = Guid.NewGuid(),
            Name = dto.BusinessName,
            BusinessType = dto.BusinessType,
            OwnerName = dto.FullName,
            Email = dto.Email,
            UserId = user.Id,
            Slug = dto.BusinessName.ToLower().Replace(" ", "-"),
            CreatedAt = DateTime.UtcNow
        };

        _context.Businesses.Add(business);

        await _context.SaveChangesAsync();

        var token = _tokenService.CreateToken(user);

        return Ok(new { token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (user == null)
        {
            return Unauthorized("Invalid credentials");
        }

        var validPassword = BCrypt.Net.BCrypt.Verify(
            dto.Password,
            user.PasswordHash
        );

        if (!validPassword)
        {
            return Unauthorized("Invalid credentials");
        }

        var token = _tokenService.CreateToken(user);

        return Ok(new
        {
            token
        });
    }
}