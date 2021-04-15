namespace AccountManager.DTOs
{
    using System;
    using System.Collections.Generic;

    using AccountManager.Models;

    public class AccountDTO
    {
        public AccountDTO()
        {
            Id = Guid.NewGuid().ToString();
            Incomes = new HashSet<IncomeDTO>();
            Expenses = new HashSet<ExpenseDTO>();
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<IncomeDTO> Incomes { get; set; }

        public virtual ICollection<ExpenseDTO> Expenses { get; set; }
    }
}
