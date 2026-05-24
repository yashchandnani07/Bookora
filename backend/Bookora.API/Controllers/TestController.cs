using Bookora.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bookora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly AppDbContext _context;

    public TestController(AppDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet]
    public IActionResult GetSecret()
    {
        return Ok(new
        {
            message = "Authenticated request succeeded",
            user = User.Identity?.Name
        });
    }
}