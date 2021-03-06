using System;
using System.Collections.Generic;
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

        public async Task<Outcome> SaveOutcomeAsync(OutcomeModel outcomeModel)
        {
            //using (var transaction = await _db.Database.BeginTransactionAsync()) 
            //{
                Outcome outcome;
                if (outcomeModel.Id.HasValue)
                    outcome = await _db.Outcomes
                        .Include(o => o.Photo)
                        .FirstAsync(o => o.Id == outcomeModel.Id.Value);
                else {
                    outcome = new Outcome();
                    _db.Add(outcome);
                }

                outcome.Name = outcomeModel.Name;
                outcome.Summary = outcomeModel.Summary;
                outcome.PhotoId = outcomeModel.PhotoId;
                outcome.QuizId = outcomeModel.QuizId;

                var existingRoleOutcomes = _db.CharacterRoleOutcomes.Where(cro => cro.OutcomeId == outcome.Id);
                _db.RemoveRange(existingRoleOutcomes);
                await _db.SaveChangesAsync();

                foreach(var roleOutcomeModel in outcomeModel.CharacterRoleOutcomes) {
                    outcome.CharacterRoleOutcomes.Add(new CharacterRoleOutcome {
                        CharacterRoleId = roleOutcomeModel.CharacterRoleId,
                        OutcomeId = outcome.Id,
                        Value = roleOutcomeModel.Value
                    });
                }
                await _db.SaveChangesAsync();
                //transaction.Commit();

                return await _db.Outcomes
                    .Include(o => o.CharacterRoleOutcomes)
                    .ThenInclude(o => o.CharacterRole)
                    .Include(o => o.AnswerOutcomes)
                    .ThenInclude(o => o.Answer)
                    .ThenInclude(o => o.Question)
                    .FirstAsync(o => o.Id == outcome.Id);
                
            //}
        }

        public async Task<int> RemoveOutcomeAsync(int outcomeId)
        {
            var answerOutcomes = _db.AnswerOutcomes.Where(ao => ao.OutcomeId == outcomeId);
            _db.RemoveRange(answerOutcomes);

            var outcome = await _db.Outcomes.FirstAsync(o => o.Id == outcomeId);
            _db.Remove(outcome);

            return await _db.SaveChangesAsync();
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

        public IEnumerable<CharacterRoleOutcomeModel> GetDefaultCharacterRoleOutcomes()
        {
            var roleOutcomes = new List<CharacterRoleOutcomeModel>();
            foreach(var role in _db.CharacterRoles.ToList()) {
                roleOutcomes.Add(new CharacterRoleOutcomeModel {
                    CharacterRoleId = role.Id,
                    CharacterRoleName = role.Name,
                    Value = 100 / _db.CharacterRoles.Count()
                });
            }
            return roleOutcomes;
        }

        public async Task<int> GetPointsPossible(int outcomeId)
        {
            var outcome = await _db.Outcomes
                .Include(o => o.AnswerOutcomes)
                .ThenInclude(ao => ao.Answer)
                .ThenInclude(a => a.Question)
                .FirstOrDefaultAsync(o => o.Id == outcomeId);
            if (outcome == null)
                return 0;

            return outcome.PointsPossible;
        }

        public async Task<Outcome> UpdatePhotoAsync(int photoId, int outcomeId)
        {
            var outcome = _db.Outcomes
                .Include(o => o.CharacterRoleOutcomes)
                .ThenInclude(co => co.CharacterRole)
                .Include(o => o.AnswerOutcomes)
                .ThenInclude(ao => ao.Answer)
                .ThenInclude(a => a.Question)
                .First(a => a.Id == outcomeId);    
            outcome.PhotoId = photoId;
            await _db.SaveChangesAsync();

            var photo = _db.Photos.First(p => p.Id == photoId);
            outcome.Photo = photo;

            return outcome;
        }
    }
}
