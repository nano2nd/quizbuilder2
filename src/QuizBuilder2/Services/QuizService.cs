using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;

namespace QuizBuilder2.Services
{
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link https://go.microsoft.com/fwlink/?LinkID=532713
    public class QuizService : IQuizService
    {
        private QuizDbContext _db;
        public QuizService(QuizDbContext db)
        {
            _db = db;
        }

        public IQueryable<Quiz> GetQuizzes(int? numberOfQuizzes = null, int? skip = null)
        {
            var quizzes = _db.Quizzes
                .Include(q => q.Questions)
                .OrderBy(q => q.Title);

            if (numberOfQuizzes.HasValue && skip.HasValue)
                return quizzes.Skip(skip.Value).Take(numberOfQuizzes.Value);

            if (numberOfQuizzes.HasValue)
                return quizzes.Take(numberOfQuizzes.Value);

            //Unlikely but lets throw it in anyway
            if (skip.HasValue)
                return quizzes.Skip(skip.Value);

            return quizzes;
        }

        public async Task<Quiz> GetQuizAsync(int id)
        {
            var quiz = await _db.Quizzes
                .Include(q => q.Outcomes)
                .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .FirstAsync(q => q.Id == id);
            return quiz;
        }
    }
}
