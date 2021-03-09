namespace AccountManager.ViewModels.InputModels
{
    using System.ComponentModel.DataAnnotations;

    public class AccountInputModel
    {
        [Required]
        [MinLength(3, ErrorMessage = "Account name must be between 3 and 40 characters long.")]
        [MaxLength(40, ErrorMessage = "Account name must be between 3 and 40 characters long.")]
        public string Name { get; set; }
    }
}
