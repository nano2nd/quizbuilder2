using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizBuilder2.Data;
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
        private readonly IMapper _mapper;
        
        public AnswerController(QuizDbContext db, IAnswerService answerService, IStorageService storageService, IMapper mapper)
        {
            _db = db;
            _answerService = answerService;  
            _storageService = storageService;
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
        public async Task<string> UploadPhoto(int answerId)
        {
            var file = Request.Form.Files[0];
            var path = $"answers/{answerId}/{file.FileName}";
            var container = "quizbuilder-photos";
            await _storageService.UploadFileAsync(file, container, path);
            return $"api/storage/{container}/{path}";
        }
    }
}
