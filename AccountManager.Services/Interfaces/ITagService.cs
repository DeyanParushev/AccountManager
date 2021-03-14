namespace AccountManager.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    
    using AccountManager.Models;

    public interface ITagService
    {
        public Task<ICollection<T>> GetAll<T>(string userId);

        public Task<T> GetOne<T>(int tagId);

        public Task Create(Tag inputTag, string userId);

        public Task<T> Edit<T>(Tag inputTag, string userId);

        public Task Delete(int tagId, string userId);
    }
}
