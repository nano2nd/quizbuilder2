using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;

namespace QuizBuilder2.Services
{
    public class OutcomeService : IOutcomeService
    {
        private QuizDbContext _db;
        
        public OutcomeService(QuizDbContext db)
        {
            _db = db;
        }

        public async Task<Outcome> SaveOutcomeAsync(OutcomeModel answerModel)
        {
            throw new NotImplementedException();
        }

        public async Task<int> RemoveOutcomeAsync(int outcomeId)
        {
            throw new NotImplementedException();
        }

        public async Task<int> LinkOutcomeToAnswerAsync(int answerId, int outcomeId)
        {
            var exists = _db.AnswerOutcomes.Any(ao => ao.AnswerId == answerId && ao.OutcomeId == outcomeId);
            if (exists)
                return 0;
            
            _db.Add(new AnswerOutcome {
                AnswerId = answerId,
                OutcomeId = outcomeId
            });

            return await _db.SaveChangesAsync();
        }

        public async Task<int> UnlinkOutcomeFromAnswerAsync(int answerId, int outcomeId)
        {
            var exists = await _db.AnswerOutcomes.FirstOrDefaultAsync(ao => ao.AnswerId == answerId && ao.OutcomeId == outcomeId);
            if (exists == null)
                return 0;
            
            _db.Remove(exists);
            return await _db.SaveChangesAsync();
        }
    }
}
