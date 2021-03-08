namespace AccountManager.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Transfer
    {
        public Transfer()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public virtual Category Category { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
