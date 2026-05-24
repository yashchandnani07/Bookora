namespace Bookora.API.DTOs.Offer;

public class CreateOfferDto
{
    public string Title { get; set; }
        = string.Empty;

    public string Description { get; set; }
        = string.Empty;

    public string Category { get; set; } = string.Empty;

    public decimal OriginalPrice { get; set; }

    public decimal OfferPrice { get; set; }

    public int TotalSlots { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public Guid BusinessId { get; set; }

    public string Status { get; set; } = "Draft";

    public int MaxBookingPerCustomer { get; set; } = 1;
}