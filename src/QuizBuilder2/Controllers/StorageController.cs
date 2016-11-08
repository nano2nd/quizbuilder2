using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using QuizBuilder2.Services;

namespace InternalAppsWeb.controllers
{
    [Route("api/[controller]")]
    public class StorageController : Controller
    {
        private readonly IStorageService _storageService;

        public StorageController(IStorageService storageService)
        {
            _storageService = storageService;
        }

        [HttpGet("{containerName}/{*blobName}")]
        public async Task<ActionResult> GetFile(string containerName, string blobName)
        {
            try
            {
                var resource = await _storageService.DownloadAsync(blobName, containerName);
                return File(resource, _storageService.GetContentType(blobName));
            }
            catch (Exception)
            {
                return new NotFoundResult();
            }
        }
    }
}
