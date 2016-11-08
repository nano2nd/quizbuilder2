using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace QuizBuilder2.Services
{
    public class StorageService : IStorageService
    {
        private CloudStorageAccount _cloudStorageAccount;
        
        public StorageService(IConfiguration configuration) 
        {
            var connectionString = configuration["ConnectionStrings:QuizBuilderPhotosConnectionString"]
                    .Replace("<storage_account_key>", configuration["storage_account_key"]);

            _cloudStorageAccount = CloudStorageAccount.Parse(connectionString);
        }

        public async Task<byte[]> DownloadAsync(string blobName, string containerName)
        {
            var blockBlob = GetFileBlobReference(blobName, containerName);

            using (var memoryStream = new MemoryStream())
            {
                await blockBlob.DownloadToStreamAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }

        public async Task<string> UploadFileAsync(IFormFile file, string containerName, string path)
        {
            using (var reader = new BinaryReader(file.OpenReadStream()))
            {
                var fileContent = reader.ReadBytes((int)file.Length);
                var blockBlob = GetFileBlobReference(path, containerName);
                
                blockBlob.Properties.ContentType = GetContentType(file.FileName);

                await blockBlob.UploadFromByteArrayAsync(fileContent, 0, fileContent.Length);
                return $"{containerName}/{path}";
            }
        }

        public string GetContentType(string fileName) 
        {
            var fileExt = Path.GetExtension(fileName);

            switch(fileExt.ToLower()) {
                case ".gif": 
                    return "image/gif";
                case ".png": 
                    return "image/png";
                case ".jpeg":
                case ".jpg": 
                    return "image/jpeg";
            }

            return "application/octet-stream";
        }

        private CloudBlockBlob GetFileBlobReference(string blobName, string containerName)
        {
            var blobClient = _cloudStorageAccount.CreateCloudBlobClient();
            var blobcontainer = blobClient.GetContainerReference(containerName);
            return blobcontainer.GetBlockBlobReference(blobName);
        }    
    }
}
