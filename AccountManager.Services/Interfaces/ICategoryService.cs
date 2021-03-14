namespace AccountManager.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using AccountManager.Models;
    
    public interface ICategoryService
    {
        public Task<ICollection<T>> GetAll<T>(string userId);

        public Task<T> GetOne<T>(int categoryId);

        public Task Create(Category category, string userId);

        public Task<T> Edit<T>(Category inputCategory, string userId);

        public Task Delete(int categoryId, string userId);
    }
}
