using Bookora.API.DTOs.Booking;
using Bookora.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBooking(
        [FromBody] CreateBookingDto dto
    )
    {
        var result =
            await _bookingService.CreateBookingAsync(dto);

        if (!result.Success)
        {
            return BadRequest(new
            {
                success = false,
                message = result.Message
            });
        }

        return Ok(new
        {
            success = true,
            message = result.Message,
            data = result.Booking
        });
    }

    [HttpGet]
    public async Task<IActionResult> GetAllBookings()
    {
        var bookings =
            await _bookingService.GetAllBookingsAsync();

        return Ok(bookings);
    }

    [Authorize]
    [HttpGet("my")]
    public async Task<IActionResult> GetMyBookings()
    {
        var bookings =
            await _bookingService.GetMyBusinessBookingsAsync(User);

        return Ok(bookings);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBookingById(Guid id)
    {
        var booking =
            await _bookingService.GetBookingByIdAsync(id);

        if (booking == null)
        {
            return NotFound(new
            {
                message = "Booking not found"
            });
        }

        return Ok(booking);
    }
}
