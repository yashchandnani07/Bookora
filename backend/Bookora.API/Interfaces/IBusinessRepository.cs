using Bookora.API.Models;

namespace Bookora.API.Interfaces;

public interface IBusinessRepository
{
    Task AddBusinessAsync(Business business);

    Task<Business?> GetBusinessByUserIdAsync(
        Guid userId
    );

    Task<Business?> GetBusinessBySlugAsync(
        string slug
    );
    
    Task SaveChangesAsync();
}