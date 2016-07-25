using System;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Seeding;

public class TestFixture : IDisposable
{
    public DbContextOptions<QuizDbContext> DbOptions { get; }
    
    public TestFixture()
    {
        var dbOptionsBuilder = new DbContextOptionsBuilder<QuizDbContext>();
            dbOptionsBuilder.UseInMemoryDatabase();

        this.DbOptions = dbOptionsBuilder.Options;
        using(var db = new QuizDbContext(DbOptions))
        {
            var seeder = new DefaultSeeder(db);
            seeder.Seed();
        }
    }

    public void Dispose()
    {
        // ... clean up test data from the database ...
    }
}