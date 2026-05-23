using Bookora.API.Data;
using Bookora.API.Interfaces;
using Bookora.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bookora.API.Repositories;

public class BusinessRepository : IBusinessRepository
{
    private readonly AppDbContext _context;

    public BusinessRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddBusinessAsync(
        Business business
    )
    {
        await _context.Businesses.AddAsync(
            business
        );
    }

    public async Task<Business?> GetBusinessByUserIdAsync(
        Guid userId
    )
    {
        return await _context.Businesses
            .FirstOrDefaultAsync(x =>
                x.UserId == userId
            );
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task<Business?> GetBusinessBySlugAsync(
        string slug
    )
    {
        return await _context.Businesses
            .FirstOrDefaultAsync(x =>
                x.Slug == slug
            );
    }
}