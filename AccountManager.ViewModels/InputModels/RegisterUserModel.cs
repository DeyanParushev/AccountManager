namespace AccountManager.ViewModels.InputModels
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterUserModel
    {
        [Required]
        [StringLength(30, ErrorMessage = "Username must be between 3 and 30 characters long.", MinimumLength = 3)]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }
    }
}
