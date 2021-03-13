namespace AccountManager.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Tag
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }
    }
}
