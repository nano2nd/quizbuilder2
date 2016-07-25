using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuizBuilder2.Controllers
{
    [Route("api/[controller]/[action]")]
    public class QuizController : Controller
    {
        private QuizDbContext _db;
        private IQuizService _quizService;
        public QuizController(QuizDbContext db, IQuizService quizService)
        {
            _db = db;
            _quizService = quizService;
            
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Quiz> GetQuizzes(int? limit, int? skip)
        {
            return _quizService.GetQuizzes(limit, skip);
        }

        // GET api/values/5
        // [HttpGet("{id}")]
        // public string Get(int id)
        // {
        //     return "value";
        // }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
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
