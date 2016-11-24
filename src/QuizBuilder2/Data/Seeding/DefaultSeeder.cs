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
        private static readonly Random random = new Random();
        private static readonly object syncLock = new object();

        private QuizDbContext _db;
        private const int NumberOfQuizzes = 16;
        private const int NumberOfOutcomes = 6;
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
            await ConnectOutcomesToCharacterRolesAsync();
            await ConnectAnswersToOutcomesAsync();
            await AddImages();
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
                    _db.Outcomes.Add(new Outcome
                    {
                        QuizId = quiz.Id,
                        Name = $"Outcome {i}",
                        Summary = $"This is a fantastic summary for the \"{quiz.Title}\" quiz."
                    });
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
                        Text = $"What is question number {i}?",
                        Points = (int)Math.Floor((decimal)(200/NumberOfQuestions))
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

        private async Task<int> ConnectOutcomesToCharacterRolesAsync()
        {
            var quizzes = _db.Quizzes
                .Include(q => q.Outcomes);
            
            foreach(var quiz in quizzes)
            {
                foreach (var outcome in quiz.Outcomes)
                {
                    foreach (var characterRole in _db.CharacterRoles)
                    {
                        int randomValue;
                        lock(syncLock) { // synchronize
                            randomValue = random.Next(0, 21);
                        }
                    
                        _db.CharacterRoleOutcomes.Add(new CharacterRoleOutcome 
                        {
                            CharacterRoleId = characterRole.Id,
                            OutcomeId = outcome.Id,
                            Value = randomValue
                        });
                    }
                }
            }

            return await _db.SaveChangesAsync();
        }

        private async Task<int> ConnectAnswersToOutcomesAsync()
        {
            var answers = _db.Answers
                .Include(a => a.Question)
                .ThenInclude(q => q.Quiz)
                .ThenInclude(q => q.Outcomes);

            foreach (var answer in answers)
            {
                var outcomes = answer.Question.Quiz.Outcomes.ToList();
            
                int randomId;
                lock(syncLock) { // synchronize
                    randomId = random.Next(0, outcomes.Count);
                }
                
                _db.AnswerOutcomes.Add(new AnswerOutcome 
                {
                    AnswerId = answer.Id,
                    OutcomeId = outcomes[randomId].Id
                });
            }

            return await _db.SaveChangesAsync();
        }

        private async Task<int> AddImages()
        {
            var images = new Photo[] {
                new Photo {
                    Description = "ariel",
                    Extension = ".jpg",
                    Path = "outcomes/2/ariel.jpg",
                    Source = "The Walt Disney Company"
                },
                new Photo {
                    Description = "Blossom Outcome",
                    Extension = ".png",
                    Path = "outcomes/15/Blossom Outcome.png",
                    Source = "http://vignette2.wikia.nocookie.net/powerpuff/images/8/80/Blossomz.png/revision/latest?cb=20121213232239"
                },
                new Photo {
                    Description = "A_country_house_in_Scotland_2",
                    Extension = ".JPG",
                    Path = "answers/47/A_country_house_in_Scotland_2.JPG",
                    Source = "This is a source thats to high up"
                }
            };

            _db.Photos.AddRange(images);
            await _db.SaveChangesAsync();

            var answer1 = await _db.Answers.FirstAsync(a => a.Id == 1);
            answer1.PhotoId = 1;

            var outcome1 = await _db.Outcomes.FirstAsync(o => o.Id == 1);
            outcome1.PhotoId = 2;

            var answer2 = await _db.Answers.FirstAsync(a => a.Id == 2);
            answer2.PhotoId = 3;

            return await _db.SaveChangesAsync();
        }
    }
}