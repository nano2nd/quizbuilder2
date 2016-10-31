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
        private readonly IMapper _mapper;
        
        public AnswerController(QuizDbContext db, IAnswerService answerService, IMapper mapper)
        {
            _db = db;
            _answerService = answerService;  
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
    }
}
