using System.Linq;
using System.Threading.Tasks;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;

namespace QuizBuilder2.Services
{
    public interface IQuizService
    {
        IQueryable<Quiz> GetQuizzes(int? numberOfQuizzes = null, int? skip = null);
        Task<Quiz> GetQuizAsync(int id);
        Task<Quiz> SaveQuizAsync(QuizModel quizModel);
        Task<int> RemoveQuizAsync(int quizId);
        Task<AnswerOutcome> RemoveAnswerOutcome(int answerId, int outcomeId);
    }
}