using Bookora.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bookora.API.Data;

public class BookoraDemoSeeder
{
    private readonly AppDbContext _context;

    private static readonly string[] Cities =
    {
        "Pune",
        "Mumbai",
        "Bengaluru",
        "Hyderabad",
        "Delhi",
        "Chennai",
    };

    private static readonly (string Type, string[] Names, string[] Offers)[] BusinessTypes =
    {
        ("Gym", new[] { "Bookora Gym", "Iron House Fitness", "Pulse Studio" },
            new[] { "Gym Trial Offer", "Peak Hour Training", "Strength Starter Pack" }),
        ("Salon", new[] { "Urban Glow Salon", "Trim & Tone", "The Groom Room" },
            new[] { "Haircut + Styling", "Weekend Grooming Deal", "Spa Facial Trial" }),
        ("Cafe", new[] { "Bean Theory", "Roast Lane Cafe", "Daily Brew" },
            new[] { "Coffee Tasting Pass", "Breakfast Combo", "Work Cafe Day Pass" }),
        ("Restaurant", new[] { "Table Nine", "Spice Yard", "Noodle House" },
            new[] { "Lunch Buffet Deal", "Couple Dinner Offer", "Chef Special Tasting" }),
        ("Clinic", new[] { "CarePoint Clinic", "Smile Hub Dental", "Wellness First" },
            new[] { "Health Checkup", "Dental Consultation", "Physio Assessment" }),
        ("Turf", new[] { "Greenline Turf", "Arena 5", "Kickoff Sports" },
            new[] { "Evening Turf Slot", "Weekend Match Pass", "Team Practice Hour" }),
    };

    public BookoraDemoSeeder(AppDbContext context)
    {
        _context = context;
    }

    public async Task<object> SeedAsync(int businessCount)
    {
        businessCount = Math.Clamp(businessCount, 1, 30);

        var existingSeedUsers = await _context.Users
            .CountAsync(x => x.Email.EndsWith("@bookora.seed"));

        var createdUsers = 0;
        var createdBusinesses = 0;
        var createdOffers = 0;
        var createdSlots = 0;
        var createdBookings = 0;

        for (var i = 0; i < businessCount; i++)
        {
            var sequence = existingSeedUsers + i + 1;
            var type = BusinessTypes[sequence % BusinessTypes.Length];
            var city = Cities[sequence % Cities.Length];
            var businessName = $"{type.Names[sequence % type.Names.Length]} {sequence}";
            var userId = Guid.NewGuid();
            var businessId = Guid.NewGuid();

            var user = new User
            {
                Id = userId,
                FullName = $"{businessName} Owner",
                Email = $"owner{sequence}@bookora.seed",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Bookora@123"),
                Role = "Business",
                CreatedAt = DateTime.UtcNow,
            };

            var business = new Business
            {
                Id = businessId,
                Name = businessName,
                BusinessType = type.Type,
                OwnerName = user.FullName,
                Phone = $"98765{(10000 + sequence) % 99999:00000}",
                Email = user.Email,
                Address = $"MG Road, {city}",
                City = city,
                OpeningTime = new TimeOnly(8, 0),
                ClosingTime = new TimeOnly(22, 0),
                CreatedAt = DateTime.UtcNow,
                UserId = userId,
                Description = $"A verified {type.Type.ToLower()} partner offering live Bookora deals in {city}.",
                Tags = type.Type,
                Slug = ToSlug($"{businessName}-{city}"),
                IsVerified = sequence % 3 != 0,
            };

            _context.Users.Add(user);
            _context.Businesses.Add(business);
            createdUsers++;
            createdBusinesses++;

            for (var offerIndex = 0; offerIndex < 2; offerIndex++)
            {
                var offerId = Guid.NewGuid();
                var startDate = DateTime.UtcNow.Date
                    .AddDays((sequence + offerIndex) % 10 + 1)
                    .AddHours(8 + offerIndex * 4);
                var slotCount = 2 + (sequence + offerIndex) % 3;
                var slotCapacity = 4 + (sequence + offerIndex) % 6;
                var totalSlots = slotCount * slotCapacity;
                var bookedSeats = 0;
                var offer = new Offer
                {
                    Id = offerId,
                    Title = type.Offers[(sequence + offerIndex) % type.Offers.Length],
                    Description = $"Limited-time {type.Type.ToLower()} offer from {businessName}.",
                    Category = type.Type,
                    OriginalPrice = 499 + offerIndex * 300,
                    OfferPrice = 99 + offerIndex * 150,
                    TotalSlots = totalSlots,
                    RemainingSlots = totalSlots,
                    StartDate = startDate,
                    EndDate = startDate.AddDays(7),
                    BusinessId = businessId,
                    CreatedAt = DateTime.UtcNow.AddMinutes(-sequence),
                    MaxBookingPerCustomer = 4,
                    Status = "Active",
                    IsActive = true,
                };

                _context.Offers.Add(offer);
                createdOffers++;

                for (var slotIndex = 0; slotIndex < slotCount; slotIndex++)
                {
                    var slotId = Guid.NewGuid();
                    var slotStart = startDate.AddDays(slotIndex).AddHours(slotIndex);
                    var preBooked = (sequence + slotIndex + offerIndex) % Math.Max(1, slotCapacity / 2);
                    var slot = new OfferSlot
                    {
                        Id = slotId,
                        SlotStart = slotStart,
                        SlotEnd = slotStart.AddHours(2),
                        Capacity = slotCapacity,
                        OfferId = offerId,
                        BookedCount = preBooked,
                        Status = preBooked >= slotCapacity ? "Full" : "Available",
                        CreatedAt = DateTime.UtcNow,
                        IsActive = true,
                    };

                    _context.OfferSlots.Add(slot);
                    createdSlots++;
                    bookedSeats += preBooked;

                    for (var bookingIndex = 0; bookingIndex < preBooked; bookingIndex++)
                    {
                        _context.Bookings.Add(new Booking
                        {
                            Id = Guid.NewGuid(),
                            BookingReference =
                                $"BK-{DateTime.UtcNow:yyyyMMdd}-{sequence:00}{offerIndex}{slotIndex}{bookingIndex}",
                            OfferId = offerId,
                            SlotId = slotId,
                            CustomerName = DemoCustomerName(sequence, bookingIndex),
                            CustomerPhone = $"90000{(sequence * 100 + bookingIndex) % 99999:00000}",
                            CustomerEmail = $"customer{sequence}{bookingIndex}@example.com",
                            PeopleCount = 1,
                            Status = "Confirmed",
                            CreatedAt = DateTime.UtcNow.AddHours(-bookingIndex - slotIndex),
                        });
                        createdBookings++;
                    }
                }

                offer.RemainingSlots = Math.Max(0, offer.TotalSlots - bookedSeats);
            }
        }

        await _context.SaveChangesAsync();

        var repaired = await RepairAvailabilityAsync();

        return new
        {
            message = "Demo data seeded successfully",
            createdUsers,
            createdBusinesses,
            createdOffers,
            createdSlots,
            createdBookings,
            repairedOffers = repaired,
            loginHint = "Seeded owner accounts use password Bookora@123",
        };
    }

    public async Task<int> RepairAvailabilityAsync()
    {
        var repairedOffers = 0;

        var offers = await _context.Offers
            .Include(offer => offer.Slots)
            .ToListAsync();

        foreach (var offer in offers)
        {
            if (offer.Slots.Count == 0)
            {
                var slot = new OfferSlot
                {
                    Id = Guid.NewGuid(),
                    SlotStart = offer.StartDate,
                    SlotEnd = offer.EndDate,
                    Capacity = Math.Max(1, offer.TotalSlots),
                    BookedCount = 0,
                    OfferId = offer.Id,
                    Status = offer.TotalSlots > 0 ? "Available" : "Full",
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true,
                };

                _context.OfferSlots.Add(slot);
                offer.RemainingSlots = slot.RemainingCapacity;
                offer.TotalSlots = slot.Capacity;
                repairedOffers++;
                continue;
            }

            if (offer.Slots.Count == 1)
            {
                var slot = offer.Slots.First();
                var targetCapacity = Math.Max(1, offer.TotalSlots);

                if (slot.Capacity != targetCapacity)
                {
                    slot.Capacity = targetCapacity;
                    slot.Status = slot.BookedCount >= slot.Capacity
                        ? "Full"
                        : "Available";
                    repairedOffers++;
                }
            }

            var totalCapacity = offer.Slots.Sum(slot => slot.Capacity);
            var bookedSeats = offer.Slots.Sum(slot => slot.BookedCount);
            var remainingSeats = Math.Max(0, totalCapacity - bookedSeats);

            if (offer.TotalSlots != totalCapacity ||
                offer.RemainingSlots != remainingSeats)
            {
                offer.TotalSlots = totalCapacity;
                offer.RemainingSlots = remainingSeats;
                repairedOffers++;
            }
        }

        await _context.SaveChangesAsync();

        return repairedOffers;
    }

    private static string ToSlug(string value)
    {
        return value
            .Trim()
            .ToLowerInvariant()
            .Replace(" ", "-")
            .Replace("&", "and");
    }

    private static string DemoCustomerName(int sequence, int bookingIndex)
    {
        var names = new[]
        {
            "Aarav Sharma",
            "Isha Mehta",
            "Kabir Khan",
            "Mira Rao",
            "Rohan Patil",
            "Sara Kapoor",
        };

        return names[(sequence + bookingIndex) % names.Length];
    }
}
