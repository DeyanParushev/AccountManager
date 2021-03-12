namespace AccountManager.ViewModels.InputModels
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using AccountManager.ViewModels.ViewModels;

    public class AccountInputModel
    {
        public string Id { get; set; }

        [Required]
        [StringLength(40, ErrorMessage = "Account name must be between 3 and 40 characters long.", MinimumLength = 3)]
        public string Name { get; set; }
    }
}
