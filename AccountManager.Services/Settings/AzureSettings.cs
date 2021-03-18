namespace AccountManager
{
    public class AzureSettings
    {
        public string Key { get; set; }

        public string SasToken { get; set; }

        public string BlobEndpoint { get; set; }

        public string BlobSasUrl { get; set; }

        public string ConnectionString { get; set; }

        public string StorageName { get; set; }

        public string ContainerName { get; set; }
    }
}
