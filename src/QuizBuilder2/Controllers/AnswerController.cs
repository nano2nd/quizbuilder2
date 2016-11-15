using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;
using QuizBuilder2.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuizBuilder2.Controllers
{
    [Authorize(Roles = "QuizAdminRole")]
    [Route("api/[controller]/[action]")]
    public class AnswerController : Controller
    {
        private readonly QuizDbContext _db;
        private readonly IAnswerService _answerService;
        private readonly IStorageService _storageService;
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        
        public AnswerController(QuizDbContext db, IAnswerService answerService, IStorageService storageService, 
            IPhotoService photoService, IMapper mapper)
        {
            _db = db;
            _answerService = answerService;  
            _storageService = storageService;
            _photoService = photoService;
            _mapper = mapper;        
        }

        [HttpPost]
        public async Task<AnswerModel> SaveAnswer(AnswerModel answerModel)
        {
            var answer = await _answerService.SaveAnswerAsync(answerModel);
            return _mapper.Map<AnswerModel>(answer);
        }

        [HttpPost]
        public async Task<int> RemoveAnswer(int answerId)
        {
            return await _answerService.RemoveAnswerAsync(answerId);
        }

        [HttpPost("{answerId}")]
        public async Task<AnswerModel> UploadPhoto(IFormFile photo, int answerId, string source)
        {
            var path = $"answers/{answerId}/{photo.FileName}";
            var container = "quizbuilder-photos";
            
            var photoPath = await _storageService.UploadFileAsync(photo, container, path);
            
            var newPhoto = new Photo {
                Description = Path.GetFileNameWithoutExtension(photo.FileName),
                Path = path,
                Extension = Path.GetExtension(photo.FileName),
                Source = source
            };
            
            await _photoService.AddPhoto(newPhoto);

            var answer = await _answerService.UpdatePhotoAsync(newPhoto.Id, answerId);

            return _mapper.Map<AnswerModel>(answer);
        }
    }
}
