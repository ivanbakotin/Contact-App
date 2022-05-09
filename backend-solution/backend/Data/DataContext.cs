using Microsoft.EntityFrameworkCore;

namespace ContactApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Phone> Phones { get; set; }

        public DbSet<Email> Emails { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Tag>()
        //        .HasIndex(p => new { p.tag, p.ContactId })
        //        .IsUnique(true);
        //    modelBuilder.Entity<Phone>()
        //        .HasIndex(p => new { p.phone, p.ContactId })
        //        .IsUnique(true);
        //    modelBuilder.Entity<Email>()
        //        .HasIndex(p => new { p.email, p.ContactId })
        //        .IsUnique(true);
        //}
    }
}