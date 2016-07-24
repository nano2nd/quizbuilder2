using System.Threading.Tasks;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Services.Interfaces;

namespace QuizBuilder2.Data.Seeding
{
    public class DefaultSeeder : ISeeder
    {
        private QuizDbContext _db;
        private const int NumberOfQuizzes = 10;
        private const int NumberOfQuestions = 9;
        private  const int NumberOfAnswers = 4;

        public DefaultSeeder(QuizDbContext db)
        {
            _db = db;
        }

        public async void Seed()
        {
            await AddQuizzesAsync();
            await AddQuestionsAsync();
            await AddAnswersAsync();       
        }

        private async Task<int> AddQuizzesAsync()
        {
            for(var i = 0; i < NumberOfQuizzes; i++)
            {
                _db.Quizzes.Add(new Quiz {
                    Title = $"Quiz Number {i}",
                    Summary = $"This summary belongs to to Quiz {i}"
                });
            }

            return await _db.SaveChangesAsync();
        }

        private async Task<int> AddQuestionsAsync()
        {
            var quizzes = _db.Quizzes;
            foreach(var quiz in quizzes)
            {
                for(var i = 0; i < NumberOfQuestions; i++)
                {
                    _db.Questions.Add(new Question {
                        QuizId = quiz.Id,
                        Text = $"What is question number {i}?"
                    });
                }
            }

            return await _db.SaveChangesAsync();
        }

        private async Task<int> AddAnswersAsync()
        {
            var questions = _db.Questions;
            foreach (var question in questions)
            {
                for(var i = 0; i < NumberOfAnswers; i++)
                {
                    _db.Answers.Add(new Answer {
                        QuestionId = question.Id,
                        Text = $"Answer number {i}"
                    });
                }
            }

            return await _db.SaveChangesAsync();
        }
    }
}