using System.Collections.Generic;
using System.Linq;
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
    public class QuizController : Controller
    {
        private QuizDbContext _db;
        private IQuizService _quizService;
        private IMapper _mapper;
        public QuizController(QuizDbContext db, IQuizService quizService, IMapper mapper)
        {
            _db = db;
            _quizService = quizService;    
            _mapper = mapper;      
        }

        [HttpGet]
        public IEnumerable<QuizModel> Quizzes(int? limit, int? skip)
        {
            return _quizService.GetQuizzes(limit, skip)
                .Select(_mapper.Map<QuizModel>);
        }

        [HttpGet("{id}")]
        public async Task<QuizModel> GetQuiz(int id)
        {
            var quiz = await _quizService.GetQuizAsync(id);
            return _mapper.Map<QuizModel>(quiz);
        }

        // POST api/values
        [HttpPost]
        public async Task<string> ChangeTitle(int quizId, string newTitle)
        {
            return await _quizService.ChangeQuizTitleAsync(quizId, newTitle);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet]
        public int Count()
        {
            return _quizService.GetQuizzes().Count();
        }
    }
}