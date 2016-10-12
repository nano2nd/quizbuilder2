using System.Threading.Tasks;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;

namespace QuizBuilder2.Services
{
    public interface IOutcomeService
    {
        Task<Outcome> SaveOutcomeAsync(OutcomeModel outcomeModel);
        Task<int> RemoveOutcomeAsync(int outcomeId);
        Task<int> LinkOutcomeToAnswerAsync(int answerId, int outcomeId);
        Task<int> UnlinkOutcomeFromAnswerAsync(int answerId, int outcomeId);
    }
}