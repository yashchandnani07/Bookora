using Bookora.API.Models;

namespace Bookora.API.Interfaces;

public interface IOfferSlotRepository
{
    Task AddSlotAsync(
        OfferSlot slot
    );

    Task<List<OfferSlot>>
        GetSlotsByOfferIdAsync(
            Guid offerId
        );

    Task<OfferSlot?> GetSlotByIdAsync(
        Guid id
    );

    Task SaveChangesAsync();
}