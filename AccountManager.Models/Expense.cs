namespace AccountManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Expense
    {
        public Expense()
        {
            Id = Guid.NewGuid().ToString();
            Tags = new HashSet<Tag>();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        [Range(double.MinValue, -0.001)]
        public decimal Amount { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }

        [Required]
        public string AccountId { get; set; }

        public virtual Account Account { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }

        [Required]
        [MaxLength(200)]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string ImageUrl { get; set; }

        public string ImageName { get; set; }
    }
}
