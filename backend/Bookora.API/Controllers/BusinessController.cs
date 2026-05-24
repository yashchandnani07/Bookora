using Bookora.API.Data;
using Bookora.API.DTOs.Business;
using Bookora.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BusinessController : ControllerBase
{
    private readonly IBusinessService _businessService;
    private readonly AppDbContext _context;

    public BusinessController(
        IBusinessService businessService,
        AppDbContext context
    )
    {
        _businessService = businessService;
        _context = context;
    }

    // CREATE BUSINESS

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateBusiness(
        CreateBusinessDto dto
    )
    {
        var business = await _businessService
            .CreateBusinessAsync(dto, User);

        return Ok(new
        {
            message =
                "Business created successfully",
            business
        });
    }

    // GET MY BUSINESS

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMyBusiness()
    {
        var business = await _businessService
            .GetMyBusinessAsync(User);

        if (business == null)
        {
            return NotFound(new
            {
                message =
                    "Business not found"
            });
        }

        return Ok(business);
    }

    // GET BUSINESS BY SLUG

    [HttpGet("{slug}")]
    public async Task<IActionResult>
        GetBusinessBySlug(string slug)
    {
        var business = await _businessService
            .GetBusinessBySlugAsync(slug);

        if (business == null)
        {
            return NotFound(new
            {
                message =
                    "Business not found"
            });
        }

        return Ok(business);
    }

    // UPDATE BUSINESS

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBusiness(
        Guid id,
        UpdateBusinessDto dto
    )
    {
        var userId = User.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier
        )?.Value;

        var business = await _context.Businesses.FindAsync(id);

        if (business == null)
        {
            return NotFound(new { message = "Business not found" });
        }

        if (business.UserId.ToString() != userId)
        {
            return Forbid();
        }

        business.Name = dto.Name;
        business.BusinessType = dto.BusinessType;
        business.OwnerName = dto.OwnerName;
        business.Phone = dto.Phone;
        business.Email = dto.Email;
        business.Address = dto.Address;
        business.City = dto.City;
        business.Description = dto.Description;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Business updated successfully",
            business
        });
    }
}