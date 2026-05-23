using Bookora.API.Data;
using Bookora.API.Interfaces;
using Bookora.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bookora.API.Repositories;

public class OfferRepository : IOfferRepository
{
    private readonly AppDbContext _context;

    public OfferRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddOfferAsync(
        Offer offer
    )
    {
        await _context.Offers.AddAsync(offer);
    }

    public async Task<List<Offer>>
        GetOffersByBusinessIdAsync(
            Guid businessId
        )
    {
        return await _context.Offers
            .Where(x => x.BusinessId == businessId)
            .ToListAsync();
    }

    public async Task<Offer?> GetOfferByIdAsync(
        Guid id
    )
    {
        return await _context.Offers
            .Include(x => x.Business)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}