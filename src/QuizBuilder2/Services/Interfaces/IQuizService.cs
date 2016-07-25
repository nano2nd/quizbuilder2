using System.Linq;
using QuizBuilder2.Data.Entities;

namespace QuizBuilder2.Services
{
    public interface IQuizService
    {
        IQueryable<Quiz> GetQuizzes(int? numberOfQuizzes = null, int? skip = null);
    }
}