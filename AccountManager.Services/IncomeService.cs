namespace AccountManager.Services.Interfaces
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    
    using AutoMapper;
    
    using AccountManager.Data;
    using AccountManager.Models;
    using AccountManager.DTOs;

    public class IncomeService : IIncomeService
    {
        private readonly AccountManagerContext context;
        private readonly IMapper mapper;

        public IncomeService(AccountManagerContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ICollection<T>> GetAll<T>(string accountId, string userId)
        {
            UserExistCheck(userId);

            if (!context.Accounts.Any(x => x.Id == accountId))
            {
                throw new ArgumentNullException("Account does not exist.");
            }

            if (!context.Accounts.Any(x => x.Id == accountId && x.UserId == userId))
            {
                throw new ArgumentNullException("User does not have such account.");
            }

            var income = context.Incomes
                .Where(x => x.AccountId == accountId && x.Account.UserId == userId)
                .ToList();

            if (income == null)
            {
                return null;
            }

            var outputIncomes = mapper.Map<ICollection<T>>(income);
            return outputIncomes;
        }

        public async Task<T> GetOne<T>(string incomeId, string userId)
        {
            IncomeExistCheck(userId, incomeId);

            var income = context.Incomes
                .Where(x => x.Id == incomeId && x.Account.UserId == userId)
                .Select(x => new IncomeDTO
                {
                    Id = x.Id,
                    CategoryId = x.CategoryId,
                    Category = new CategoryDTO { Id = x.Category.Id, Name = x.Category.Name},
                    Amount = x.Amount,
                    Date = x.Date,
                    Description = x.Description,
                    Tags = x.Tags.Select(y => new TagDTO { Id = y.Id, Name = y.Name}).ToArray(),
                    AccountId = x.AccountId
                })
                .SingleOrDefault();

            if(income == null)
            {
                throw new ArgumentNullException("Income with this Id does not exist in this account.");
            }

            var outputIncome = mapper.Map<T>(income);
            return outputIncome;
        }

        public async Task Create(Income inputIncome)
        {
            if (!context.Accounts.Any(x => x.Id == inputIncome.AccountId))
            {
                throw new ArgumentNullException("Account does note exist.");
            }

            var income = context.Incomes
                .Where(x =>x.Id == inputIncome.Id)
                .SingleOrDefault();

            if (income != null)
            {
                throw new ArgumentException("Account name already exists");
            }

            inputIncome.Id = Guid.NewGuid().ToString();
            await context.Incomes.AddAsync(inputIncome);

            await context.SaveChangesAsync();
        }

        public async Task<T> Edit<T>(Income inputIncome, string userId)
        {
            var dbIncome = context.Incomes.SingleOrDefault(x => x.Id == inputIncome.Id);

            UserExistCheck(userId);

            dbIncome.AccountId = inputIncome.AccountId;
            dbIncome.Amount = inputIncome.Amount;
            dbIncome.CategoryId = inputIncome.CategoryId;
            dbIncome.Tags = inputIncome.Tags;
            dbIncome.Description = inputIncome.Description;

            await context.SaveChangesAsync();

            var outputIncome = mapper.Map<T>(dbIncome);
            return outputIncome;
        }

        public async Task Delete(string incomeId, string userId)
        {
            UserExistCheck(userId);
            IncomeExistCheck(userId, incomeId);

            var income = context.Incomes
                .SingleOrDefault(x => x.Id == incomeId && x.Account.UserId == userId);

            context.Incomes.Remove(income);
            await context.SaveChangesAsync();
        }

        private void UserExistCheck(string userId)
        {
            if (!context.Users.Any(x => x.Id == userId))
            {
                throw new ArgumentNullException("User does not exist.");
            }
        }

        private void IncomeExistCheck(string userId, string incomeId)
        {
            UserExistCheck(userId);

            if (!context.Incomes.Any(x => x.Id == incomeId && x.Account.UserId == userId))
            {
                throw new ArgumentNullException("User does not have such income.");
            }
        }
    }
}
