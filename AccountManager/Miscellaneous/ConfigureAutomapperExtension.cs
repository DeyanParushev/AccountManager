namespace AccountManager
{
    using Microsoft.Extensions.DependencyInjection;
   
    using AccountManager.DTOs;
    using AccountManager.Models;
    using AccountManager.ViewModels;
    using AccountManager.ViewModels.InputModels;
    using AccountManager.ViewModels.ViewModels;
    using AccountManager.Services.Automapper;

    public static class ConfigureAutomapperExtension
    {
        public static void ConfigureAutomapper(this IServiceCollection services)
        {
            services.AddAutoMapper(options =>
            {
                options.CreateMap<Account, AccountDTO>();
                options.CreateMap<Expense, ExpenseDTO>();
                options.CreateMap<Income, IncomeDTO>();
                options.CreateMap<Category, CategoryDTO>();
                options.CreateMap<Tag, TagDTO>();

                options.CreateMap<AccountDTO, AccountViewModel>();
                options.CreateMap<IncomeDTO, IncomeViewModel>();
                options.CreateMap<ExpenseDTO, ExpenseViewModel>();
                options.CreateMap<TagDTO, TagViewModel>();
                options.CreateMap<CategoryDTO, CategoryViewModel>();

                options.CreateMap<AccountInputModel, Account>();
                options.CreateMap<IncomeInputModel, Income>();
                options.CreateMap<ExpenseInputModel, Expense>();
                options.CreateMap<CategoryInputModel, Category>();
                options.CreateMap<TagInputModel, Tag>();
            });
        }
    }
}
