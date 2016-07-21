using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Models;

namespace QuizBuilder2.Data
{
    public class QuizDbContext : IdentityDbContext<ApplicationUser>
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options)
            : base(options)
        { }

        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
    }
}