using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [Authorize]
    [HttpGet]
    public IActionResult GetSecret()
    {
        return Ok(new
        {
            message = "Protected route working",
            user = User.Identity?.Name
        });
    }
}