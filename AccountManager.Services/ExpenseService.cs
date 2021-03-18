namespace AccountManager.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using AccountManager.Data;
    using AccountManager.Models;
    using AccountManager.Services.Interfaces;

    public class ExpenseService : IExpenseService
    {
        private readonly AccountManagerContext context;
        private readonly IMapper mapper;
        private readonly ICloudService cloudService;

        public ExpenseService(AccountManagerContext context, IMapper mapper, ICloudService cloudService)
        {
            this.context = context;
            this.mapper = mapper;
            this.cloudService = cloudService;
        }

        public async Task<ICollection<T>> GetAll<T>(string accountId, string userId)
        {
            UserExistCheck(userId);
            if(!context.Accounts.Any(x => x.Id == accountId))
            {
                throw new ArgumentNullException("Account does not exist.");
            }

            if(!context.Accounts.Any(x => x.Id == accountId && x.UserId == userId))
            {
                throw new ArgumentNullException("User does not have such account.");
            }

            var expenses = context.Expenses
                .Where(x => x.AccountId == accountId && x.Account.UserId == userId)
                .ToList();

            if(expenses == null)
            {
                return null;
            }

            var outputExpenses = mapper.Map<ICollection<T>>(expenses);
            return outputExpenses;
        }

        public async Task<T> GetOne<T>(string expenseId, string userId)
        {
            ExpenseExistCheck(userId, expenseId);

            var expense = context.Expenses
                .Where(x => x.Id == expenseId && x.Account.UserId == userId)
                .SingleOrDefault();

            var outputExpense = mapper.Map<T>(expense);
            return outputExpense;
        }

        public async Task Create(Expense inputExpense, byte[] image)
        {
            if(!context.Accounts.Any(x => x.Id == inputExpense.AccountId))
            {
                throw new ArgumentNullException("Account does note exist.");
            }

            var imageUrl = await cloudService.Upload(image, inputExpense.ImageName);

            context.Expenses.Add(inputExpense);
            await context.SaveChangesAsync();
        }

        public async Task<T> Edit<T>(Expense inputExpense, string userId)
        {
            var dbExpense = context.Expenses.SingleOrDefault(x => x.Id == inputExpense.Id);

            UserExistCheck(userId);
            
            dbExpense.AccountId = inputExpense.AccountId;
            dbExpense.Amount = inputExpense.Amount;
            dbExpense.CategoryId = inputExpense.CategoryId;
            dbExpense.Tags = inputExpense.Tags;
            dbExpense.Description = inputExpense.Description;

            await context.SaveChangesAsync();

            var outputExpense = mapper.Map<T>(dbExpense);
            return outputExpense;
        }

        public async Task Delete(string expenseId, string userId)
        {
            UserExistCheck(userId);
            ExpenseExistCheck(userId, expenseId);

            var expense = context.Expenses
                .SingleOrDefault(x => x.Id == expenseId && x.Account.UserId == userId);

            context.Expenses.Remove(expense);
            await context.SaveChangesAsync();
        }

        private void UserExistCheck(string userId)
        {
            if (!context.Users.Any(x => x.Id == userId))
            {
                throw new ArgumentNullException("User does not exist.");
            }
        }

        private void ExpenseExistCheck(string userId, string expenseId)
        {
            UserExistCheck(userId);

            if (!context.Expenses.Any(x => x.Id == expenseId && x.Account.UserId == userId))
            {
                throw new ArgumentNullException("User does not have such expense.");
            }
        }
    }
}
