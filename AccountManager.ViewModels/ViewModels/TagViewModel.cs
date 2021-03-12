namespace AccountManager.ViewModels
{
    using AccountManager.DTOs;
    using AccountManager.Services.Automapper;

    public class TagViewModel : IMapFrom<TagDTO>
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}