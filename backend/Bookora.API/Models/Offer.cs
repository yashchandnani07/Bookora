namespace Bookora.API.Models;

public class Offer
{
    public Guid Id { get; set; }

    public string Title { get; set; }
        = string.Empty;

    public string Description { get; set; }
        = string.Empty;

    public decimal OriginalPrice { get; set; }

    public decimal OfferPrice { get; set; }

    public int TotalSlots { get; set; }

    public int RemainingSlots { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool IsActive { get; set; }
        = true;

    public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;


    // RELATIONSHIP

    public Guid BusinessId { get; set; }

    public Business? Business { get; set; }
}