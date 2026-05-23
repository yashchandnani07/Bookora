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

    public BusinessController(
        IBusinessService businessService
    )
    {
        _businessService = businessService;
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
            message = "Business created successfully",
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
                message = "Business not found"
            });
        }

        return Ok(business);
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBusinessBySlug(
        string slug
    )
    {
        var business = await _businessService
            .GetBusinessBySlugAsync(slug);

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