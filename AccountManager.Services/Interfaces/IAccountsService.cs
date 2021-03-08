using System.Collections.Generic;

namespace AccountManager.Services.Interfaces
{
    public interface IAccountsService
    {
        public ICollection<T> GetAll<T>(string userId);

        public T GetAccount<T>(string accountId);

        public void Create<T>(T account);

        public void Delete(string accountId);

        public T2 Edit<T1, T2>(T1 account);
    }
}
