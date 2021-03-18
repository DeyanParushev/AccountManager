namespace AccountManager.Services
{
    using System.Threading.Tasks;

    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Blob;

    using AccountManager.Services.Interfaces;

    public class BlobService : ICloudService
    {
        private readonly AzureSettings azure;

        public BlobService(AzureSettings azure)
        {
            this.azure = azure;
        }

        public async Task<string> Upload(byte[] file, string fileName)
        {
            var cloudStorageAccount = CloudStorageAccount.Parse(azure.ConnectionString);
            var cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
            string strContainerName = azure.ContainerName;
            var cloudBlobContainer = cloudBlobClient.GetContainerReference(strContainerName);

            if (await cloudBlobContainer.CreateIfNotExistsAsync())
            {
                await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
            }

            if (fileName != null && file != null)
            {
                var cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(fileName);
                cloudBlockBlob.Properties.ContentType = "image/web";

                await cloudBlockBlob.UploadFromByteArrayAsync(file, 0, file.Length);
                return cloudBlockBlob.Uri.AbsoluteUri;
            }

            return "";
        }
    }
}
