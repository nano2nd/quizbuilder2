using System.Threading.Tasks;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;

namespace QuizBuilder2.Services
{
    public interface IQuestionService
    {
        Task<Question> SaveQuestionAsync(QuestionModel questionModel);
        Task<int> RemoveQuestionAsync(int questionId);
        Task<int> UpdatePointsAsync(int questionId, int points);
    }
}