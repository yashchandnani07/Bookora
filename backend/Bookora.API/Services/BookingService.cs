using Bookora.API.Data;
using Bookora.API.DTOs.Booking;
using Bookora.API.Interfaces;
using Bookora.API.Models;
using Microsoft.AspNetCore.SignalR;
using Bookora.API.Hubs;

namespace Bookora.API.Services;

public class BookingService : IBookingService
{
    private readonly IHubContext<BookingHub> _hubContext;
    private readonly IBookingRepository _bookingRepository;
    private readonly IOfferRepository _offerRepository;
    private readonly IOfferSlotRepository _slotRepository;
    private readonly AppDbContext _context;

    public BookingService(
        IBookingRepository bookingRepository,
        IOfferRepository offerRepository,
        IOfferSlotRepository slotRepository,
        AppDbContext context,
        IHubContext<BookingHub> hubContext
    )
    {
        _bookingRepository = bookingRepository;
        _offerRepository = offerRepository;
        _slotRepository = slotRepository;
        _context = context;
        _hubContext = hubContext;
    }

    public async Task<(bool Success, string Message, Booking? Booking)>
        CreateBookingAsync(CreateBookingDto dto)
    {
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

        if (slot.BookedCount >= slot.Capacity)
        {
            slot.Status = "Full";
        }

        _context.OfferSlots.Update(slot);

        await _context.SaveChangesAsync();
        await _hubContext.Clients.All.SendAsync(
    "SlotUpdated",
    new
    {
        SlotId = slot.Id,
        Capacity = slot.Capacity,
        BookedCount = slot.BookedCount,
        RemainingCapacity = slot.RemainingCapacity,
        Status = slot.Status
    }
);

        await _bookingRepository.CreateAsync(booking);

        return (true, "Booking created successfully", booking);
    }

    public async Task<List<Booking>> GetAllBookingsAsync()
    {
        return await _bookingRepository.GetAllAsync();
    }

    public async Task<Booking?> GetBookingByIdAsync(Guid id)
    {
        return await _bookingRepository.GetByIdAsync(id);
    }
}