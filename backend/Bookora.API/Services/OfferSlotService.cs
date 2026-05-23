using Bookora.API.DTOs.OfferSlot;
using Bookora.API.Interfaces;
using Bookora.API.Models;

namespace Bookora.API.Services;

public class OfferSlotService
    : IOfferSlotService
{
    private readonly IOfferSlotRepository
        _slotRepository;

    public OfferSlotService(
        IOfferSlotRepository slotRepository
    )
    {
        _slotRepository = slotRepository;
    }

    public async Task<OfferSlot>
        CreateSlotAsync(
            CreateOfferSlotDto dto
        )
    {
        var slot = new OfferSlot
        {
            Id = Guid.NewGuid(),

            SlotStart = dto.SlotStart,

            SlotEnd = dto.SlotEnd,

            Capacity = dto.Capacity,

            RemainingCapacity = dto.Capacity,

            OfferId = dto.OfferId,

            CreatedAt = DateTime.UtcNow
        };

        await _slotRepository
            .AddSlotAsync(slot);

        await _slotRepository
            .SaveChangesAsync();

        return slot;
    }

    public async Task<List<OfferSlot>>
        GetOfferSlotsAsync(
            Guid offerId
        )
    {
        return await _slotRepository
            .GetSlotsByOfferIdAsync(
                offerId
            );
    }

    public async Task<OfferSlot?>
        GetSlotByIdAsync(Guid id)
    {
        return await _slotRepository
            .GetSlotByIdAsync(id);
    }
}