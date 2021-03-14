namespace AccountManager.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AccountManager.Models;
    
    public interface IAccountService
    {
        public Task<ICollection<T>> GetAll<T>(string userId);
        
        public Task<T> GetOne<T>(string accountId, string userId);

        public Task Create(Account account);
        
        public Task<T> Edit<T>(Account account, string userId);

        public Task Delete(string accountId, string userId);
    }
}
