namespace AccountManager.Data
{
    using IdentityServer4.EntityFramework.Options;
    using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;

    using AccountManager.Models;

    public class AccountManagerContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public AccountManagerContext(
             DbContextOptions options,
             IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<Account> Accounts { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Expense> Expenses { get; set; }

        public DbSet<Income> Incomes { get; set; }

        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Expense>()
                .Property("Amount")
                .HasPrecision(20, 10);

            builder.Entity<Income>()
                .Property("Amount")
                .HasPrecision(20, 10);

            base.OnModelCreating(builder);   
        }
    }
}
