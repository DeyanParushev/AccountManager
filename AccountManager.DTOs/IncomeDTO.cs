namespace AccountManager.DTOs
{
    using System;
    using System.Collections.Generic;

    public class IncomeDTO
    {
        public IncomeDTO()
        {
            Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public decimal Amount { get; set; }

        public int CategoryId { get; set; }

        public virtual CategoryDTO Category { get; set; }

        public string AccountId { get; set; }

        public virtual AccountDTO Account { get; set; }

        public virtual ICollection<TagDTO> Tags { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public string ImageName { get; set; }

        public string ImageUrl { get; set; }
    }
}
