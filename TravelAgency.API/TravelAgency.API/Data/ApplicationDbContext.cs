using Microsoft.EntityFrameworkCore;
using TravelAgency.API.Models;

namespace TravelAgency.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        
        public DbSet<Package> Packages { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<PackageImage> PackageImages { get; set; }
        public DbSet<HotelImage> HotelImages { get; set; }

        public DbSet<Inquiry> Inquiries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Destination)
                .WithMany(d => d.Bookings)
                .HasForeignKey(b => b.DestinationId)
                .OnDelete(DeleteBehavior.Restrict);

           

           

           

            modelBuilder.Entity<Package>()
                .HasOne(p => p.Destination)
                .WithMany(d => d.Packages)
                .HasForeignKey(p => p.DestinationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Hotel>()
                .HasOne(h => h.Destination)
                .WithMany(d => d.Hotels)
                .HasForeignKey(h => h.DestinationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PackageImage>()
                .HasOne(pi => pi.Package)
                .WithMany(p => p.PackageImages)
                .HasForeignKey(pi => pi.PackageId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HotelImage>()
                .HasOne(hi => hi.Hotel)
                .WithMany(h => h.HotelImages)
                .HasForeignKey(hi => hi.HotelId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}