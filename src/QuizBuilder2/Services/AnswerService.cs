using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;

namespace QuizBuilder2.Services
{
    public class AnswerService : IAnswerService
    {
        private QuizDbContext _db;
        public AnswerService(QuizDbContext db)
        {
            _db = db;
        }

        public async Task<Answer> SaveAnswerAsync(AnswerModel answerModel)
        {
            Answer answer;
            if (answerModel.Id.HasValue)
                answer = await _db.Answers
                    .Include(a => a.AnswerOutcomes)
                    .Include(a => a.Photo)
                    .FirstAsync(a => a.Id == answerModel.Id.Value);
            else {
                answer = new Answer();
                _db.Add(answer);
            }

            answer.Text = answerModel.Text;
            answer.QuestionId = answerModel.QuestionId;
            answer.IsPhotoOnly = answerModel.IsPhotoOnly;
            answer.PhotoId = answerModel.PhotoId;

            await _db.SaveChangesAsync();
            return answer;
        }

        public async Task<Answer> UpdatePhotoAsync(int photoId, int answerId)
        {
            var answer = _db.Answers.First(a => a.Id == answerId);    
            answer.PhotoId = photoId;
            await _db.SaveChangesAsync();

            var photo = _db.Photos.First(p => p.Id == photoId);
            answer.Photo = photo;

            return answer;
        }

        public async Task<int> RemoveAnswerAsync(int answerId)
        {
            var answer = await _db.Answers.FirstAsync(a => a.Id == answerId);
            _db.Remove(answer);
            return await _db.SaveChangesAsync();
        }
    }
}
