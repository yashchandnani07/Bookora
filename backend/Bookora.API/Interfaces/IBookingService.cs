using Bookora.API.DTOs.Booking;
using Bookora.API.Models;
using System.Security.Claims;

namespace Bookora.API.Interfaces;

public interface IBookingService
{
    Task<(bool Success, string Message, Booking? Booking)>
        CreateBookingAsync(CreateBookingDto dto);

    Task<List<Booking>> GetAllBookingsAsync();

    Task<List<Booking>> GetMyBusinessBookingsAsync(ClaimsPrincipal user);

    Task<Booking?> GetBookingByIdAsync(Guid id);
}
