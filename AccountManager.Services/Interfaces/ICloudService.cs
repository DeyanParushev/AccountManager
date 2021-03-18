using System.Threading.Tasks;

namespace AccountManager.Services.Interfaces
{
    public interface ICloudService
    {
        public Task<string> Upload(byte[] file, string fileName);
    }
}
