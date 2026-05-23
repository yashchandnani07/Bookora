using Microsoft.EntityFrameworkCore;
using Bookora.API.Models;

namespace Bookora.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Business> Businesses => Set<Business>();

    public DbSet<Offer> Offers => Set<Offer>();


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Offer>()
            .HasOne(x => x.Business)
            .WithMany(x => x.Offers)
            .HasForeignKey(x => x.BusinessId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Business>()
            .HasOne(x => x.User)
            .WithMany(x => x.Businesses)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}