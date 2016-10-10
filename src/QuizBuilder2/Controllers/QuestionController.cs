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
    public class QuestionController : Controller
    {
        private readonly QuizDbContext _db;
        private readonly IQuestionService _questionService;
        private readonly IMapper _mapper;
        
        public QuestionController(QuizDbContext db, IQuestionService questionService, IMapper mapper)
        {
            _db = db;
            _questionService = questionService;  
            _mapper = mapper;        
        }

        [HttpPost]
        public async Task<QuestionModel> SaveQuestion(QuestionModel questionModel)
        {
            var question = await _questionService.SaveQuestionAsync(questionModel);
            return _mapper.Map<QuestionModel>(question);
        }

        [HttpPost]
        public async Task<int> RemoveQuestion(int questionId)
        {
            return await _questionService.RemoveQuestionAsync(questionId);
        }

        [HttpPost]
        public async Task<int> UpdatePoints(int questionId, int points)
        {
            return await _questionService.UpdatePointsAsync(questionId, points);
        }
    }
}
