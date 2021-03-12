namespace AccountManager.ViewModels.InputModels
{
    using System.ComponentModel.DataAnnotations;

    public class LoginUserModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
