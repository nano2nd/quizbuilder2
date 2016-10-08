using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuizBuilder2.Controllers
{
    [Authorize(Roles = "QuizAdminRole")]
    [Route("api/[controller]/[action]")]
    public class QuestionController : Controller
    {
        private QuizDbContext _db;
        private IQuizService _quizService;
        public QuestionController(QuizDbContext db, IQuizService quizService)
        {
            _db = db;
            _quizService = quizService;          
        }

        [HttpPost]
        public void UnlinkOutcomeFromAnswer([FromBody] AnswerOutcome answerOutcome)
        {
            _quizService.RemoveAnswerOutcome(answerOutcome.AnswerId, answerOutcome.OutcomeId);
        }
    }
}
