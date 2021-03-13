namespace AccountManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Account
    {
        public Account()
        {
            Id = Guid.NewGuid().ToString();
            Incomes = new HashSet<Income>();
            Expenses = new HashSet<Expense>();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Name { get; set; }

        public virtual ICollection<Income> Incomes { get; set; }

        public virtual ICollection<Expense> Expenses { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}
