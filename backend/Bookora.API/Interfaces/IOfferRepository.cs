using Bookora.API.Models;

namespace Bookora.API.Interfaces;

public interface IOfferRepository
{
    Task AddOfferAsync(Offer offer);

    Task<List<Offer>> GetOffersByBusinessIdAsync(
        Guid businessId
    );

    Task<Offer?> GetOfferByIdAsync(
        Guid id
    );

    Task SaveChangesAsync();
}