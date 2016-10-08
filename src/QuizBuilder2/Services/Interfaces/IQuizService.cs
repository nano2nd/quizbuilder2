using System.Linq;
using System.Threading.Tasks;
using QuizBuilder2.Data.Entities;

namespace QuizBuilder2.Services
{
    public interface IQuizService
    {
        IQueryable<Quiz> GetQuizzes(int? numberOfQuizzes = null, int? skip = null);
        Task<Quiz> GetQuizAsync(int id);
        Task<AnswerOutcome> RemoveAnswerOutcome(int answerId, int outcomeId);
        Task<string> ChangeQuizTitleAsync(int quizId, string newTitle);
        Task<int> RemoveQuiz(int quizId);
    }
}