using Bookora.API.Models;

namespace Bookora.API.Interfaces;

public interface IBookingRepository
{
    Task<Booking> CreateAsync(Booking booking);

    Task<List<Booking>> GetAllAsync();

    Task<List<Booking>> GetByBusinessIdAsync(Guid businessId);

    Task<Booking?> GetByIdAsync(Guid id);

    Task<int> GetCustomerBookingCountAsync(
        Guid offerId,
        string customerPhone
    );
}
