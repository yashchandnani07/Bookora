using Bookora.API.DTOs.Offer;
using Bookora.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OfferController : ControllerBase
{
    private readonly IOfferService _offerService;

    public OfferController(
        IOfferService offerService
    )
    {
        _offerService = offerService;
    }

    // CREATE OFFER

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateOffer(
        CreateOfferDto dto
    )
    {
        var offer = await _offerService
            .CreateOfferAsync(dto, User);

        return Ok(new
        {
            message = "Offer created successfully",
            offer
        });
    }

    // GET BUSINESS OFFERS

    [HttpGet("business/{businessId}")]
    public async Task<IActionResult>
        GetBusinessOffers(
            Guid businessId
        )
    {
        var offers = await _offerService
            .GetBusinessOffersAsync(
                businessId
            );

        return Ok(offers);
    }

    // GET OFFER BY ID

    [HttpGet("{id}")]
    public async Task<IActionResult>
        GetOfferById(Guid id)
    {
        var offer = await _offerService
            .GetOfferByIdAsync(id);

        if (offer == null)
        {
            return NotFound(new
            {
                message = "Offer not found"
            });
        }

        return Ok(offer);
    }
}