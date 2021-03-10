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

        public async Task Create(Account account)
        {
            var user = context.Users.SingleOrDefault(x => x.Id == account.UserId);

            if (user == null)
            {
                throw new ArgumentException("User does not exist.");
            }

            var userAccount = context.Accounts
                .Where(x => x.UserId == user.Id && x.Name == account.Name)
                .SingleOrDefault();

            if (userAccount != null)
            {
                throw new ArgumentException("Account name already exists");
            }

            context.Accounts.Add(account);
            await context.SaveChangesAsync();
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
