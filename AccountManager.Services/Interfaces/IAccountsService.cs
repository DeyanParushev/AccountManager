using AccountManager.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AccountManager.Services.Interfaces
{
    public interface IAccountsService
    {
        public Task<ICollection<T>> GetAll<T>(string userId);

        public Task<T> GetAccount<T>(string accountId);

        public Task Delete(string accountId);

        public Task<T2> Edit<T1, T2>(T1 account);
        
        public Task Create(Account account, string userId);
    }
}
