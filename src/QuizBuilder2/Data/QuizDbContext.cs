using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Data.Entities;

namespace QuizBuilder2.Data
{
    public class QuizDbContext : IdentityDbContext<ApplicationUser>
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnswerOutcome>().HasKey(a => new { a.AnswerId, a.OutcomeId });
            modelBuilder.Entity<CharacterRoleOutcome>().HasKey( c => new { c.CharacterRoleId, c.OutcomeId });
        }

        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<CharacterRole> CharacterRoles { get; set; }
        public DbSet<Outcome> Outcomes { get; set; }
        public DbSet<CharacterRoleOutcome> CharacterRoleOutcomes { get; set; }
    }
}