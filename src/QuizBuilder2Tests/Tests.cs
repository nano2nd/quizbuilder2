using Xunit;
using QuizBuilder2.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using QuizBuilder2.Services;

namespace QuizBuilder2Tests
{
    // see example explanation on xUnit.net website:
    // https://xunit.github.io/docs/getting-started-dotnet-core.html
    public class Tests : IClassFixture<TestFixture>
    {
        private TestFixture _testFixture { get; }
        public Tests(TestFixture testFixture)
        {
            _testFixture = testFixture;
        }

        [Fact]
        public async void DbTest()
        {
            using (var db = new QuizDbContext(_testFixture.DbOptions))
            {
                var count = db.Quizzes.Count();
                Assert.Equal(10, count);

                var firstQuiz = await db.Quizzes
                    .Include(q => q.Questions)
                    .ThenInclude(q => q.Answers)
                    .ThenInclude(a => a.AnswerOutcomes)
                    .FirstAsync();
                    
                Assert.NotNull(firstQuiz);
                Assert.Equal("Quiz Number 0", firstQuiz.Title);

                var firstQuestion = firstQuiz.Questions.First();
                Assert.Equal("What is question number 0?", firstQuestion.Text);

                var firstAnswer = firstQuestion.Answers.First();
                Assert.Equal("Answer number 0", firstAnswer.Text);

                var answerOutcome = firstAnswer.AnswerOutcomes.First();
                Assert.NotNull(answerOutcome);
            }
        }

        [Fact]
        public void ShouldGetQuizzesTest()
        {
            const int numberOfQuizzes = 3;
            var skipInterval = numberOfQuizzes;

            using (var db = new QuizDbContext(_testFixture.DbOptions))
            {
                var quizService = new QuizService(db);
                var quizzes1 = quizService.GetQuizzes(numberOfQuizzes).ToList();
                Assert.Equal("Quiz Number 0", quizzes1[0].Title);
                Assert.Equal("Quiz Number 1", quizzes1[1].Title);
                Assert.Equal("Quiz Number 2", quizzes1[2].Title);
                Assert.Equal(numberOfQuizzes,  quizzes1.Count);
                
                var quizzes2 = quizService.GetQuizzes(numberOfQuizzes, skipInterval).ToList();
                Assert.Equal("Quiz Number 3", quizzes2[0].Title);                
                Assert.Equal("Quiz Number 4", quizzes2[1].Title);                
                Assert.Equal("Quiz Number 5", quizzes2[2].Title);                
                Assert.Equal(numberOfQuizzes, quizzes2.Count);
            }
        }
    }
}
