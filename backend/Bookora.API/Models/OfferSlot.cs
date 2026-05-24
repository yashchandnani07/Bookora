namespace Bookora.API.Models;

using System.ComponentModel.DataAnnotations.Schema;

public class OfferSlot
{
    public Guid Id { get; set; }

    public DateTime SlotStart { get; set; }

    public DateTime SlotEnd { get; set; }

    public int Capacity { get; set; }

    [NotMapped]
    public int RemainingCapacity
    {
        get
        {
            return Capacity - BookedCount;
        }
    }

    public bool IsActive { get; set; }
        = true;

    public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;


    // RELATIONSHIP

    public Guid OfferId { get; set; }

    public Offer? Offer { get; set; }

    public int BookedCount { get; set; } = 0;

    public string Status { get; set; } = "Available";

    public ICollection<Booking> Bookings { get; set; }
        = new List<Booking>();
}