namespace Bookora.API.Models;

public class Business
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string BusinessType { get; set; } = string.Empty;

    public string OwnerName { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string LogoUrl { get; set; } = string.Empty;

    public TimeOnly OpeningTime { get; set; }

    public TimeOnly ClosingTime { get; set; }

    public DateTime CreatedAt { get; set; }
        = DateTime.UtcNow;


    // RELATIONSHIP

    public Guid UserId { get; set; }

    public User? User { get; set; }

    public string Description { get; set; }
    = string.Empty;

    public string Tags { get; set; }
        = string.Empty;

    public string Slug { get; set; }
        = string.Empty;

    public bool IsVerified { get; set; }
        = false;
}