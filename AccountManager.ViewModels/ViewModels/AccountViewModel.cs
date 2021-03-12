namespace AccountManager.ViewModels.ViewModels
{
    using System.Collections.Generic;
    using AccountManager.DTOs;
    using AccountManager.Services.Automapper;

    public class AccountViewModel : IMapFrom<AccountDTO>
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public ICollection<IncomeViewModel> Incomes { get; set; }

        public ICollection<ExpenseViewModel> Expenses { get; set; }
    }
}
