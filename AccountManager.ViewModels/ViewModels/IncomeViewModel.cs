namespace AccountManager.ViewModels.ViewModels
{
    using System;
    using System.Collections.Generic;
    
    using AccountManager.DTOs;
    using AccountManager.Services.Automapper;

    public class IncomeViewModel : IMapFrom<IncomeDTO>
    {
        public string Id { get; set; }

        public decimal Amount { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public CategoryViewModel Category { get; set; }

        public ICollection<TagViewModel> Tags { get; set; }
    }
}
