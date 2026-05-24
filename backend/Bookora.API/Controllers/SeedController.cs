using Bookora.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace Bookora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SeedController : ControllerBase
{
    private readonly BookoraDemoSeeder _seeder;
    private readonly IWebHostEnvironment _environment;

    public SeedController(
        BookoraDemoSeeder seeder,
        IWebHostEnvironment environment
    )
    {
        _seeder = seeder;
        _environment = environment;
    }

    [HttpGet("demo")]
    [HttpPost("demo")]
    public async Task<IActionResult> SeedDemoData(
        [FromQuery] int businesses = 12
    )
    {
        if (!_environment.IsDevelopment())
        {
            return NotFound();
        }

        var result = await _seeder.SeedAsync(businesses);

        return Ok(result);
    }

    [HttpGet("repair-availability")]
    [HttpPost("repair-availability")]
    public async Task<IActionResult> RepairAvailability()
    {
        if (!_environment.IsDevelopment())
        {
            return NotFound();
        }

        var repairedOffers = await _seeder.RepairAvailabilityAsync();

        return Ok(new
        {
            message = "Offer and slot availability repaired",
            repairedOffers,
        });
    }
}
