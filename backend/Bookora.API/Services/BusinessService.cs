using System.Security.Claims;
using Bookora.API.DTOs.Business;
using Bookora.API.Interfaces;
using Bookora.API.Models;

namespace Bookora.API.Services;

public class BusinessService : IBusinessService
{
    private readonly IBusinessRepository _repository;

    public BusinessService(
        IBusinessRepository repository
    )
    {
        _repository = repository;
    }

    public async Task<Business> CreateBusinessAsync(
        CreateBusinessDto dto,
        ClaimsPrincipal user
    )
    {
        var userId = user.FindFirstValue(
            ClaimTypes.NameIdentifier
        );

        var business = new Business
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            BusinessType = dto.BusinessType,
            OwnerName = dto.OwnerName,
            Phone = dto.Phone,
            Email = dto.Email,
            Address = dto.Address,
            City = dto.City,
            LogoUrl = dto.LogoUrl,
            OpeningTime = dto.OpeningTime,
            ClosingTime = dto.ClosingTime,
            CreatedAt = DateTime.UtcNow,
            UserId = Guid.Parse(userId!),
            Description = dto.Description,
            Tags = dto.Tags,
            Slug = dto.Name
                .ToLower()
                .Replace(" ", "-"),
        };

        await _repository.AddBusinessAsync(
            business
        );

        await _repository.SaveChangesAsync();

        return business;
    }

    public async Task<Business?> GetMyBusinessAsync(
        ClaimsPrincipal user
    )
    {
        var userId = user.FindFirstValue(
            ClaimTypes.NameIdentifier
        );

        return await _repository
            .GetBusinessByUserIdAsync(
                Guid.Parse(userId!)
            );
    }

    public async Task<Business?> GetBusinessBySlugAsync(
        string slug
    )
    {
        return await _repository
            .GetBusinessBySlugAsync(slug);
    }
}