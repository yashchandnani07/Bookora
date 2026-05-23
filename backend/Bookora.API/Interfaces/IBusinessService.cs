using Bookora.API.DTOs.Business;
using Bookora.API.Models;
using System.Security.Claims;

namespace Bookora.API.Interfaces;

public interface IBusinessService
{
    Task<Business> CreateBusinessAsync(
        CreateBusinessDto dto,
        ClaimsPrincipal user
    );

    Task<Business?> GetMyBusinessAsync(
        ClaimsPrincipal user
    );

    Task<Business?> GetBusinessBySlugAsync(
        string slug
    );
}