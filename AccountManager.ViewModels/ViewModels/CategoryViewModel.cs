namespace AccountManager.ViewModels
{
    using AccountManager.DTOs;
    using AccountManager.Services.Automapper;

    public class CategoryViewModel : IMapFrom<CategoryDTO>
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}