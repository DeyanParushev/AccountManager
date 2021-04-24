namespace AccountManager.ViewModels.InputModels
{
    using Microsoft.AspNetCore.Http;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class ExpenseInputModel
    {
        public string Id { get; set; }

        [Required]
        [Range(double.MinValue, -0.001)]
        public decimal Amount { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string AccountId { get; set; }

        //public virtual ICollection<TagInputModel> Tags { get; set; }

        [Required]
        [StringLength(200, ErrorMessage = "Description must be between 5 and 200 characters long.", MinimumLength = 5)]
        public string Description { get; set; }

        public DateTime Date => DateTime.UtcNow;

        public IFormFile Image { get; set; }

        public string ImageName { get; set; }
    }
}
