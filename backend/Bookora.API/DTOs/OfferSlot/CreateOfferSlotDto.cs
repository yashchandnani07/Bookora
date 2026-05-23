namespace Bookora.API.DTOs.OfferSlot;

public class CreateOfferSlotDto
{
    public DateTime SlotStart { get; set; }

    public DateTime SlotEnd { get; set; }

    public int Capacity { get; set; }

    public Guid OfferId { get; set; }
}