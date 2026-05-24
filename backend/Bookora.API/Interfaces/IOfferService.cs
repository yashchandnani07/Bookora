using Bookora.API.DTOs.Offer;
using Bookora.API.Models;
using System.Security.Claims;

namespace Bookora.API.Interfaces;

public interface IOfferService
{
    Task<Offer> CreateOfferAsync(
        CreateOfferDto dto,
        ClaimsPrincipal user
    );

    Task<List<Offer>> GetBusinessOffersAsync(
        Guid businessId
    );

    Task<List<Offer>> GetAllOffersAsync();

    Task<Offer?> GetOfferByIdAsync(
        Guid id
    );
}