using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

public interface IStorageService {
    Task<string> UploadFileAsync(IFormFile file, string containerName, string path = "");
    Task<byte[]> DownloadAsync(string blobName, string containerName);
    string GetContentType(string fileName);
}