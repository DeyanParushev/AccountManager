namespace AccountManager.ViewModels
{
    using System;
    using System.Collections.Generic;

    public class ExpenseViewModel
    {
        public string Id { get; set; }

        public decimal Amount { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public CategoryViewModel Category { get; set; }

        public ICollection<TagViewModel> Tags { get; set; }
    }
}
