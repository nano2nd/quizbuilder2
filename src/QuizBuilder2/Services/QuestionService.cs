using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;

namespace QuizBuilder2.Services
{
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

        public async Task<IEnumerable<Question>> SaveQuestionsAsync(IEnumerable<QuestionModel> questions)
        {
            var newQuestions = questions.Select(q => new Question {
                Text = q.Text,
                Points = 10,
                QuizId = q.QuizId,
                Answers = q.Answers.Select(a => new Answer {
                    Text = a.Text
                }).ToList()
            }).ToList(); // We do a final ToList so we get an actualy object in-memory, so that Ids update after save
            
            _db.AddRange(newQuestions);

            await _db.SaveChangesAsync();
            return newQuestions;
        }

        public async Task<int> RemoveQuestionAsync(int questionId)
        {
            var question = await _db.Questions.FirstAsync(q => q.Id == questionId);
            _db.Remove(question);
            return await _db.SaveChangesAsync();
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
