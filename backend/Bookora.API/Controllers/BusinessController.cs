using Bookora.API.Data;
using Bookora.API.DTOs.Business;
using Bookora.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Bookora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BusinessController : ControllerBase
{
    private readonly AppDbContext _context;

    public BusinessController(AppDbContext context)
    {
        _context = context;
    }

    // CREATE BUSINESS

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateBusiness(CreateBusinessDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var business = new Business
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            BusinessType = dto.BusinessType,
            OwnerName = dto.OwnerName,
            Phone = dto.Phone,
            Email = dto.Email,
            Address = dto.Address,
            City = dto.City,
            LogoUrl = dto.LogoUrl,
            OpeningTime = dto.OpeningTime,
            ClosingTime = dto.ClosingTime,
            CreatedAt = DateTime.UtcNow,
            UserId = Guid.Parse(userId)
        };

        _context.Businesses.Add(business);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Business created successfully"
        });
    }

    // GET MY BUSINESS

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMyBusiness()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var business = await _context.Businesses
            .FirstOrDefaultAsync(x => x.UserId == Guid.Parse(userId));

        if (business == null)
        {
            return NotFound(new
            {
                message = "Business not found"
            });
        }

        return Ok(business);
    }
}