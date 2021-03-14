namespace AccountManager.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    
    using AccountManager.Models;

    public interface IIncomeService
    {
        public Task<ICollection<T>> GetAll<T>(string accountId, string userId);

        public Task<T> GetOne<T>(string incomeId, string userId);

        public Task Create(Income inputIncome);

        public Task<T> Edit<T>(Income inputIncome, string userId);

        public Task Delete(string incomeId, string userId);
    }
}
