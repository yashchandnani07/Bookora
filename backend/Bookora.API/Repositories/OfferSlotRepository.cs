using Bookora.API.Data;
using Bookora.API.Interfaces;
using Bookora.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bookora.API.Repositories;

public class OfferSlotRepository
    : IOfferSlotRepository
{
    private readonly AppDbContext _context;

    public OfferSlotRepository(
        AppDbContext context
    )
    {
        _context = context;
    }

    public async Task AddSlotAsync(
        OfferSlot slot
    )
    {
        await _context.OfferSlots
            .AddAsync(slot);
    }

    public async Task<List<OfferSlot>>
        GetSlotsByOfferIdAsync(
            Guid offerId
        )
    {
        return await _context.OfferSlots
            .Where(x => x.OfferId == offerId)
            .ToListAsync();
    }

    public async Task<OfferSlot?>
        GetSlotByIdAsync(Guid id)
    {
        return await _context.OfferSlots
            .Include(x => x.Offer)
            .FirstOrDefaultAsync(x =>
                x.Id == id
            );
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}