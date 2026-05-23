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


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Business>()
            .HasOne(x => x.User)
            .WithMany(x => x.Businesses)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}