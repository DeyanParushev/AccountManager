using System.ComponentModel.DataAnnotations;

namespace AccountManager.ViewModels.InputModels
{
    public class TagInputModel
    {
        [Required]
        [StringLength(20, ErrorMessage = "Tag name must be between 3 and 20 characters long.", MinimumLength = 3)]
        public string Name { get; set; }
    }
}
