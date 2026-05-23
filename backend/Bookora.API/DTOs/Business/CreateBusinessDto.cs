namespace Bookora.API.DTOs.Business;

public class CreateBusinessDto
{
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

    public string Description { get; set; }
    = string.Empty;

    public string Tags { get; set; }
        = string.Empty;
}