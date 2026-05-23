using Bookora.API.DTOs.Offer;
using Bookora.API.Interfaces;
using Bookora.API.Models;
using System.Security.Claims;

namespace Bookora.API.Services;

public class OfferService : IOfferService
{
    private readonly IOfferRepository _offerRepository;

    private readonly IBusinessRepository _businessRepository;

    public OfferService(
        IOfferRepository offerRepository,
        IBusinessRepository businessRepository
    )
    {
        _offerRepository = offerRepository;
        _businessRepository = businessRepository;
    }

    public async Task<Offer> CreateOfferAsync(
        CreateOfferDto dto,
        ClaimsPrincipal user
    )
    {
        var business = await _businessRepository
            .GetBusinessByUserIdAsync(
                dto.BusinessId
            );

        var offer = new Offer
        {
            Id = Guid.NewGuid(),

            Title = dto.Title,

            Description = dto.Description,

            OriginalPrice = dto.OriginalPrice,

            OfferPrice = dto.OfferPrice,

            TotalSlots = dto.TotalSlots,

            RemainingSlots = dto.TotalSlots,

            StartDate = dto.StartDate,

            EndDate = dto.EndDate,

            BusinessId = dto.BusinessId,

            CreatedAt = DateTime.UtcNow
        };

        await _offerRepository.AddOfferAsync(
            offer
        );

        await _offerRepository.SaveChangesAsync();

        return offer;
    }

    public async Task<List<Offer>>
        GetBusinessOffersAsync(
            Guid businessId
        )
    {
        return await _offerRepository
            .GetOffersByBusinessIdAsync(
                businessId
            );
    }

    public async Task<Offer?> GetOfferByIdAsync(
        Guid id
    )
    {
        return await _offerRepository
            .GetOfferByIdAsync(id);
    }
}