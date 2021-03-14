namespace AccountManager.Services
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Collections.Generic;

    using AutoMapper;

    using AccountManager.Data;
    using AccountManager.Services.Interfaces;
    using AccountManager.Models;

    public class CategoryService : ICategoryService
    {
        private readonly AccountManagerContext context;
        private readonly IMapper mapper;

        public CategoryService(AccountManagerContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ICollection<T>> GetAll<T>(string userId)
        {
            UserExistCheck(userId);

            var categories = context.Categories.Select(x => x).ToList();
            var outputCategories = mapper.Map<ICollection<T>>(categories);

            return outputCategories;
        }

        public async Task<T> GetOne<T>(int categoryId)
        {
            CategoryExistCheck(categoryId);

            var category = context.Categories.SingleOrDefault(x => x.Id == categoryId);
            var outputCategory = mapper.Map<T>(category);

            return outputCategory;
        }

        public async Task Create(Category category, string userId)
        {
            UserExistCheck(userId);

            var categoryExists = context.Categories
                .Any(x => x.Id == category.Id || x.Name.ToLower() == category.Name.ToLower());

            if (categoryExists)
            {
                throw new ApplicationException("Category already exists");
            }

            category.Name = category.Name.ToLower();
            context.Categories.Add(category);
            await context.SaveChangesAsync();
        }

        public async Task<T> Edit<T>(Category inputCategory, string userId)
        {
            UserExistCheck(userId);
            CategoryExistCheck(inputCategory.Id);

            var category = context.Categories.SingleOrDefault(x => x.Id == inputCategory.Id);
            category.Name = inputCategory.Name.ToLower();

            await context.SaveChangesAsync();

            var outputCategory = mapper.Map<T>(category);
            return outputCategory;
        }

        public async Task Delete(int categoryId, string userId)
        {
            UserExistCheck(userId);
            CategoryExistCheck(categoryId);

            var category = context.Categories.SingleOrDefault(x => x.Id == categoryId);
            context.Remove(category);

            await context.SaveChangesAsync();
        }

        private void UserExistCheck(string userId)
        {
            if (!context.Users.Any(x => x.Id == userId))
            {
                throw new ArgumentNullException("User does not exist.");
            }
        }

        private void CategoryExistCheck(int categoryId)
        {
            if (!context.Categories.Any(x => x.Id == categoryId))
            {
                throw new ArgumentNullException("Category does not exist.");
            }
        }
    }
}
