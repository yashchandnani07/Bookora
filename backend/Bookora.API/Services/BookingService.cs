using Bookora.API.Data;
using Bookora.API.DTOs.Booking;
using Bookora.API.Interfaces;
using Bookora.API.Models;
using Microsoft.AspNetCore.SignalR;
using Bookora.API.Hubs;
using System.Security.Claims;

namespace Bookora.API.Services;

public class BookingService : IBookingService
{
    private readonly IHubContext<BookingHub> _hubContext;
    private readonly IBookingRepository _bookingRepository;
    private readonly IOfferRepository _offerRepository;
    private readonly IOfferSlotRepository _slotRepository;
    private readonly IBusinessRepository _businessRepository;
    private readonly AppDbContext _context;

    public BookingService(
        IBookingRepository bookingRepository,
        IOfferRepository offerRepository,
        IOfferSlotRepository slotRepository,
        IBusinessRepository businessRepository,
        AppDbContext context,
        IHubContext<BookingHub> hubContext
    )
    {
        _bookingRepository = bookingRepository;
        _offerRepository = offerRepository;
        _slotRepository = slotRepository;
        _businessRepository = businessRepository;
        _context = context;
        _hubContext = hubContext;
    }

    public async Task<(bool Success, string Message, Booking? Booking)>
        CreateBookingAsync(CreateBookingDto dto)
    {
        await using var transaction =
            await _context.Database.BeginTransactionAsync();

        var offer = await _offerRepository.GetByIdAsync(dto.OfferId);

        if (offer == null)
        {
            return (false, "Offer not found", null);
        }

        if (offer.Status != "Active")
        {
            return (false, "Offer is not active", null);
        }

        if (offer.EndDate < DateTime.UtcNow)
        {
            return (false, "Offer has expired", null);
        }

        var slot = await _slotRepository.GetByIdAsync(dto.SlotId);

        if (slot == null)
        {
            return (false, "Slot not found", null);
        }

        if (slot.Status != "Available")
        {
            return (false, "Slot is not available", null);
        }

        var availableSeats = slot.Capacity - slot.BookedCount;

        if (dto.PeopleCount <= 0)
        {
            return (false, "People count must be at least 1", null);
        }

        if (dto.PeopleCount > availableSeats)
        {
            return (false, "Not enough seats available", null);
        }

        var existingBookings =
            await _bookingRepository.GetCustomerBookingCountAsync(
                dto.OfferId,
                dto.CustomerPhone
            );

        if (existingBookings >= offer.MaxBookingPerCustomer)
        {
            return (false, "Booking limit exceeded", null);
        }

        var booking = new Booking
        {
            Id = Guid.NewGuid(),
            OfferId = dto.OfferId,
            SlotId = dto.SlotId,
            CustomerName = dto.CustomerName,
            CustomerPhone = dto.CustomerPhone,
            CustomerEmail = dto.CustomerEmail,
            PeopleCount = dto.PeopleCount,
            SpecialNote = dto.SpecialNote,
            Status = "Confirmed",
            BookingReference =
                $"BK-{DateTime.UtcNow:yyyyMMdd}-{Random.Shared.Next(1000, 9999)}"
        };

        slot.BookedCount += dto.PeopleCount;
        offer.RemainingSlots = Math.Max(
            0,
            offer.RemainingSlots - dto.PeopleCount
        );

        if (slot.BookedCount >= slot.Capacity)
        {
            slot.Status = "Full";
        }

        _context.OfferSlots.Update(slot);
        _context.Offers.Update(offer);
        _context.Bookings.Add(booking);

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();

        await _hubContext.Clients.All.SendAsync(
            "SlotUpdated",
            new
            {
                SlotId = slot.Id,
                OfferId = offer.Id,
                Capacity = slot.Capacity,
                BookedCount = slot.BookedCount,
                RemainingCapacity = slot.RemainingCapacity,
                RemainingSlots = offer.RemainingSlots,
                TotalSlots = offer.TotalSlots,
                Status = slot.Status,
            });

        return (true, "Booking created successfully", booking);
    }

    public async Task<List<Booking>> GetAllBookingsAsync()
    {
        return await _bookingRepository.GetAllAsync();
    }

    public async Task<List<Booking>> GetMyBusinessBookingsAsync(
        ClaimsPrincipal user
    )
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
        {
            return new List<Booking>();
        }

        var business = await _businessRepository
            .GetBusinessByUserIdAsync(Guid.Parse(userId));

        if (business == null)
        {
            return new List<Booking>();
        }

        return await _bookingRepository
            .GetByBusinessIdAsync(business.Id);
    }

    public async Task<Booking?> GetBookingByIdAsync(Guid id)
    {
        return await _bookingRepository.GetByIdAsync(id);
    }
}
