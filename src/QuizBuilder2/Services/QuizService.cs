using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;

namespace QuizBuilder2.Services
{
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
                .ThenInclude(o => o.CharacterRoleOutcomes)
                .ThenInclude(cro => cro.Role)
                
                .Include(q => q.Outcomes)
                .ThenInclude(o => o.CharacterRoleOutcomes)
                .ThenInclude(cro => cro.Outcome)

                .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .ThenInclude(a => a.AnswerOutcomes)
                
                .FirstAsync(q => q.Id == id);

            return quiz;
        }

        public async Task<Quiz> SaveQuizAsync(QuizModel quizModel) {
            Quiz quiz;
            if (quizModel.Id.HasValue)
                quiz = await _db.Quizzes.FirstAsync(q => q.Id == quizModel.Id.Value);
            else {
                quiz = new Quiz();
                _db.Add(quiz);
            }

            quiz.Title = quizModel.Title.Trim();
            quiz.Summary = quizModel.Summary;
            
            await _db.SaveChangesAsync();
            return quiz;
        }

        public async Task<int> RemoveQuizAsync(int quizId)
        {
            var quiz = await _db.Quizzes.FirstAsync(q => q.Id == quizId);
            _db.Remove(quiz);
            return await _db.SaveChangesAsync();
        }

        public async Task<AnswerOutcome> RemoveAnswerOutcome(int answerId, int outcomeId)
        {
            var answerOutcome = await _db.AnswerOutcomes
                .FirstAsync(ao => ao.AnswerId == answerId && ao.OutcomeId == outcomeId);
            _db.AnswerOutcomes.Remove(answerOutcome);
            return answerOutcome;
        }
    }
}
