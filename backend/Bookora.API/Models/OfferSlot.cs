namespace Bookora.API.Models;

public class OfferSlot
{
    public Guid Id { get; set; }

    public DateTime SlotStart { get; set; }

    public DateTime SlotEnd { get; set; }

    public int Capacity { get; set; }

    public int RemainingCapacity { get; set; }

    public bool IsActive { get; set; }
        = true;

    public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;


    // RELATIONSHIP

    public Guid OfferId { get; set; }

    public Offer? Offer { get; set; }
}