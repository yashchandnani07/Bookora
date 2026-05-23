using Bookora.API.DTOs.OfferSlot;
using Bookora.API.Models;

namespace Bookora.API.Interfaces;

public interface IOfferSlotService
{
    Task<OfferSlot> CreateSlotAsync(
        CreateOfferSlotDto dto
    );

    Task<List<OfferSlot>>
        GetOfferSlotsAsync(
            Guid offerId
        );

    Task<OfferSlot?> GetSlotByIdAsync(
        Guid id
    );
}