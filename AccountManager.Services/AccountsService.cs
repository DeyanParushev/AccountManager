namespace AccountManager.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using AccountManager.Data;
    using AccountManager.Models;
    using AccountManager.Services.Interfaces;

    public class AccountsService : IAccountsService
    {
        private readonly AccountManagerContext context;

        public AccountsService(AccountManagerContext context)
        {
            this.context = context;
        }

        public async Task Create(Account account, string userId)
        {
            var userAccounts = context.Users
                .Where(x => x.Id == userId)
                .Select(x => x.Accounts)
                .SingleOrDefault();

            if (userAccounts == null || !userAccounts.Contains(account))
            {
                context.Accounts.Add(account);
                await context.SaveChangesAsync();
            }

            throw new ArgumentException("Account name already exists");
        }

        public Task Delete(string accountId)
        {
            throw new System.NotImplementedException();
        }

        public Task<T2> Edit<T1, T2>(T1 account)
        {
            throw new System.NotImplementedException();
        }

        public Task<T> GetAccount<T>(string accountId)
        {
            throw new System.NotImplementedException();
        }

        public Task<ICollection<T>> GetAll<T>(string userId)
        {
            throw new System.NotImplementedException();
        }
    }
}
