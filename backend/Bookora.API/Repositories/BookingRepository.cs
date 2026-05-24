using Bookora.API.Data;
using Bookora.API.Interfaces;
using Bookora.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bookora.API.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly AppDbContext _context;

    public BookingRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Booking> CreateAsync(Booking booking)
    {
        await _context.Bookings.AddAsync(booking);

        await _context.SaveChangesAsync();

        return booking;
    }

    public async Task<List<Booking>> GetAllAsync()
    {
        return await _context.Bookings
            .Include(b => b.Offer)
            .Include(b => b.Slot)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<Booking>> GetByBusinessIdAsync(Guid businessId)
    {
        return await _context.Bookings
            .Include(b => b.Offer)
            .Include(b => b.Slot)
            .Where(b => b.Offer.BusinessId == businessId)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    public async Task<Booking?> GetByIdAsync(Guid id)
    {
        return await _context.Bookings
            .Include(b => b.Offer)
            .ThenInclude(o => o.Business)
            .Include(b => b.Slot)
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<int> GetCustomerBookingCountAsync(
        Guid offerId,
        string customerPhone
    )
    {
        return await _context.Bookings
            .CountAsync(b =>
                b.OfferId == offerId &&
                b.CustomerPhone == customerPhone
            );
    }
}
