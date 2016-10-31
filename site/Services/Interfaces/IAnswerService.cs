using System.Threading.Tasks;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;

namespace QuizBuilder2.Services
{
    public interface IAnswerService
    {
        Task<Answer> SaveAnswerAsync(AnswerModel answerModel);
        Task<int> RemoveAnswerAsync(int answerId);
    }
}