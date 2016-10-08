using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;

namespace QuizBuilder2.Services
{
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link https://go.microsoft.com/fwlink/?LinkID=532713
    public class QuestionService : IQuestionService
    {
        private QuizDbContext _db;
        public QuestionService(QuizDbContext db)
        {
            _db = db;
        }

        public async Task<Question> SaveQuestionAsync(QuestionModel questionModel)
        {
            Question question;
            if (questionModel.Id.HasValue)
                question = await _db.Questions.FirstAsync(q => q.Id == questionModel.Id.Value);
            else {
                question = new Question();
                _db.Add(question);
            }

            question.Text = questionModel.Text;
            question.Points = questionModel.Points;
            question.QuizId = questionModel.QuizId;

            await _db.SaveChangesAsync();
            return question;
        }

        public async Task<int> UpdatePointsAsync(int questionId, int points)
        {
            var question = await _db.Questions.FirstAsync(q => q.Id == questionId);
            question.Points = points;
            await _db.SaveChangesAsync();
            return question.Points;
        }
    }
}
