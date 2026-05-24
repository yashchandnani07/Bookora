using Bookora.API.Models;

namespace Bookora.API.Interfaces;

public interface IOfferRepository
{

    Task<Offer?> GetByIdAsync(Guid id);
    
    Task AddOfferAsync(Offer offer);

    Task<List<Offer>> GetOffersByBusinessIdAsync(
        Guid businessId
    );

    Task<List<Offer>> GetAllOffersAsync();

    Task<Offer?> GetOfferByIdAsync(
        Guid id
    );

    Task SaveChangesAsync();
}