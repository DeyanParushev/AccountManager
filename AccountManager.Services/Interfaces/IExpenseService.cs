namespace AccountManager.Services.Interfaces
{
    using AccountManager.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IExpenseService
    {
        public Task<ICollection<T>> GetAll<T>(string accountId ,string userId);

        public Task<T> GetOne<T>(string expenseId, string userId);

        public Task Create(Expense inputExpense, byte[] image);

        public Task<T> Edit<T>(Expense inputExpense, string userId);

        public Task Delete(string expenseId, string userId);
    }
}
