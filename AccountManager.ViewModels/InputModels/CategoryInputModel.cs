using System.ComponentModel.DataAnnotations;

namespace AccountManager.ViewModels.InputModels
{
    public class CategoryInputModel
    {
        [Range(0, int.MaxValue)]
        public int Id { get; set; }

        [Required]
        [StringLength(40, ErrorMessage = "Category name must be between 3 and 40 characters long.", MinimumLength = 3)]
        public string Name { get; set; }
    }
}
