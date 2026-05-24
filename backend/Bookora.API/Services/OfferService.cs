using Bookora.API.DTOs.Offer;
using Bookora.API.Hubs;
using Bookora.API.Interfaces;
using Bookora.API.Models;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Bookora.API.Services;

public class OfferService : IOfferService
{
    private readonly IOfferRepository _offerRepository;
    private readonly IOfferSlotRepository _slotRepository;
    private readonly IHubContext<BookingHub> _hubContext;

    public OfferService(
        IOfferRepository offerRepository,
        IOfferSlotRepository slotRepository,
        IHubContext<BookingHub> hubContext
    )
    {
        _offerRepository = offerRepository;
        _slotRepository = slotRepository;
        _hubContext = hubContext;
    }

    public async Task<Offer> CreateOfferAsync(
        CreateOfferDto dto,
        ClaimsPrincipal user
    )
    {
        var offer = new Offer
        {
            Id = Guid.NewGuid(),

            Title = dto.Title,

            Description = dto.Description,

            Category = dto.Category,

            OriginalPrice = dto.OriginalPrice,

            OfferPrice = dto.OfferPrice,

            TotalSlots = dto.TotalSlots,

            RemainingSlots = dto.TotalSlots,

            StartDate = dto.StartDate,

            EndDate = dto.EndDate,

            BusinessId = dto.BusinessId,

            CreatedAt = DateTime.UtcNow,

            Status = dto.Status,
            
            MaxBookingPerCustomer = dto.MaxBookingPerCustomer,
        };

        await _offerRepository.AddOfferAsync(
            offer
        );

        await _slotRepository.AddSlotAsync(
            new OfferSlot
            {
                Id = Guid.NewGuid(),
                SlotStart = dto.StartDate,
                SlotEnd = dto.EndDate,
                Capacity = dto.TotalSlots,
                OfferId = offer.Id,
                CreatedAt = DateTime.UtcNow,
                Status = dto.TotalSlots > 0 ? "Available" : "Full",
            }
        );

        await _offerRepository.SaveChangesAsync();

        await _hubContext.Clients.All.SendAsync(
            "OfferCreated",
            new
            {
                OfferId = offer.Id,
                BusinessId = offer.BusinessId,
                Status = offer.Status,
            }
        );

        return offer;
    }

    public async Task<List<Offer>> GetBusinessOffersAsync(Guid businessId)
    {
        return await _offerRepository
            .GetOffersByBusinessIdAsync(businessId);
    }

    public async Task<List<Offer>> GetAllOffersAsync()
    {
        return await _offerRepository.GetAllOffersAsync();
    }

    public async Task<Offer?> GetOfferByIdAsync(
        Guid id
    )
    {
        return await _offerRepository
            .GetOfferByIdAsync(id);
    }
}
