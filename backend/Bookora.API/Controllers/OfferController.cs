using Bookora.API.DTOs.Offer;
using Bookora.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Bookora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OfferController : ControllerBase
{
    private readonly IOfferService _offerService;
    private readonly IBusinessRepository _businessRepository;

    public OfferController(
        IOfferService offerService,
        IBusinessRepository businessRepository
    )
    {
        _offerService = offerService;
        _businessRepository = businessRepository;
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

    // GET MY OFFERS

    [Authorize]
    [HttpGet("my")]
    public async Task<IActionResult> GetMyOffers()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var business = await _businessRepository
            .GetBusinessByUserIdAsync(Guid.Parse(userId!));

        if (business == null)
        {
            return NotFound(new { message = "Business not found" });
        }

        var offers = await _offerService
            .GetBusinessOffersAsync(business.Id);

        return Ok(offers);
    }

    // GET ALL OFFERS (public marketplace)

    [HttpGet("all")]
    public async Task<IActionResult> GetAllOffers()
    {
        var offers = await _offerService.GetAllOffersAsync();
        return Ok(offers);
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