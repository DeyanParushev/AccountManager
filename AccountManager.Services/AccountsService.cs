﻿namespace AccountManager.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;
    using AccountManager.Data;
    using AccountManager.Models;
    using AccountManager.Services.Interfaces;

    public class AccountsService : IAccountsService
    {
        private readonly AccountManagerContext context;
        private readonly IMapper mapper;

        public AccountsService(AccountManagerContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<T> GetAccount<T>(string accountId, string userId)
        {
            var account = context
                .Accounts
                .Where(x => x.Id == accountId && x.UserId == userId)
                .SingleOrDefault();

            if (account == null)
            {
                throw new ArgumentNullException("Account does not exist.");
            }

            var returnAccount = mapper.Map<T>(account);

            return returnAccount;
        }

        public async Task<ICollection<T>> GetAll<T>(string userId)
        {
            var user = context.Users
                .Where(x => x.Id == userId)
                .SingleOrDefault();

            if (user == null)
            {
                throw new ArgumentNullException("User does not exist.");
            }

            var accounts = context.Accounts
                .Where(x => userId == user.Id)
                .ToList();

            var returnAcoounts = mapper.Map<ICollection<T>>(accounts);

            return returnAcoounts;
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

        public async Task<T> Edit<T>(Account account, string userId)
        {
            var user = context.Users
                .Where(x => x.Id == userId)
                .Select(x => new
                {
                    Id = x.Id,
                    Accounts = x.Accounts,
                })
                .SingleOrDefault(); 

            if(user == null)
            {
                throw new ArgumentNullException("User does not exist.");
            }

            var userAccount = context
                .Accounts
                .SingleOrDefault(x => x.Id == account.Id && x.UserId == userId);

            if(userAccount == null)
            {
                throw new ArgumentNullException("Account does not exist.");
            }

            userAccount.Name = account.Name;

            await context.SaveChangesAsync();

            var mappedAccount = mapper.Map<T>(userAccount);
            return mappedAccount;
        }

        public async Task Delete(string accountId, string userId)
        {
            var account = context.Accounts.SingleOrDefault(x => x.Id == accountId && x.UserId == userId);
            
            if(account == null)
            {
                throw new ArgumentNullException("Account does not exist.");
            }

            context.Accounts.Remove(account);
            await context.SaveChangesAsync();
        }
    }
}
