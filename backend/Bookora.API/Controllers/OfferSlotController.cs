using Bookora.API.DTOs.OfferSlot;
using Bookora.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookora.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OfferSlotController
    : ControllerBase
{
    private readonly IOfferSlotService
        _slotService;

    public OfferSlotController(
        IOfferSlotService slotService
    )
    {
        _slotService = slotService;
    }

    // CREATE SLOT

    [Authorize]
    [HttpPost]
    public async Task<IActionResult>
        CreateSlot(
            CreateOfferSlotDto dto
        )
    {
        var slot = await _slotService
            .CreateSlotAsync(dto);

        return Ok(new
        {
            message =
                "Offer slot created successfully",

            slot
        });
    }

    // GET OFFER SLOTS

    [HttpGet("offer/{offerId}")]
    public async Task<IActionResult>
        GetOfferSlots(
            Guid offerId
        )
    {
        var slots = await _slotService
            .GetOfferSlotsAsync(
                offerId
            );

        return Ok(slots);
    }

    // GET SLOT BY ID

    [HttpGet("{id}")]
    public async Task<IActionResult>
        GetSlotById(Guid id)
    {
        var slot = await _slotService
            .GetSlotByIdAsync(id);

        if (slot == null)
        {
            return NotFound(new
            {
                message = "Slot not found"
            });
        }

        return Ok(slot);
    }
}