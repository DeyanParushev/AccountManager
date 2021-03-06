namespace AccountManager.ViewModels.InputModels
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class IncomeInputModel
    {
        public string Id { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Amount must be a positive number.")]
        public decimal Amount { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }

        [Required]
        public string AccountId { get; set; }

        //public virtual ICollection<TagInputModel> Tags { get; set; }

        [Required]
        [StringLength(200, ErrorMessage = "Description must be between 5 and 200 characters long.", MinimumLength = 5)]
        public string Description { get; set; }

        public DateTime Date => DateTime.UtcNow;

        public byte[] Image { get; set; }

        public string ImageName { get; set; }
    }
}
