using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Services;

namespace QuizBuilder2.Data.Seeding
{
    public class DefaultSeeder : ISeeder
    {
        private QuizDbContext _db;
        private const int NumberOfQuizzes = 10;
        private const int NumberOfOutcomes = 5;
        private const int NumberOfQuestions = 9;
        private  const int NumberOfAnswers = 4;

        public DefaultSeeder(QuizDbContext db)
        {
            _db = db;
        }

        public async void Seed()
        {
            await AddCharacterRoles();
            await AddQuizzesAsync();
            await AddOutcomesAsync();
            await AddQuestionsAsync();
            await AddAnswersAsync();
            await ConnectAnswersToOutcomes();  
        }

        private async Task<int> AddCharacterRoles()
        {
            _db.CharacterRoles.AddRange(
                new CharacterRole { Name = "The Scholar"},
                new CharacterRole { Name = "The Villian" },
                new CharacterRole { Name = "The Hero" },
                new CharacterRole { Name = "The Artist" },
                new CharacterRole { Name = "The Joker" },
                new CharacterRole { Name = "The Gaurdian" }
            );

            return await _db.SaveChangesAsync();            
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

        private async Task<int> AddOutcomesAsync() 
        {
            var quizzes = _db.Quizzes;
            foreach (var quiz in quizzes)
            {
                for (int i = 0; i < NumberOfOutcomes; i++)
                {
                    var outcome = new Outcome
                    {
                        Name = $"Outcome {i}",
                        Summary = $"This is a fantastic summary for the \"{quiz.Title}\" quiz."
                    };
                }
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

        private async Task<int> ConnectAnswersToOutcomes()
        {
            var random = new Random();
            var answers = _db.Answers
                .Include(a => a.Question)
                .ThenInclude(q => q.Quiz)
                .ThenInclude(q => q.Outcomes);

            foreach (var answer in answers)
            {
                var outcomes = answer.Question.Quiz.Outcomes.ToList();
                var connection = new AnswerOutcome 
                {
                    AnswerId = answer.Id,
                    OutcomeId = outcomes.First(o => o.Id == random.Next(1, outcomes.Count)).Id
                };
            }

            return await _db.SaveChangesAsync();
        }
    }
}