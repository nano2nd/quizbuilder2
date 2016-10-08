using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Seeding;
using QuizBuilder2.Services;

public class TestFixture : IDisposable
{
    public DbContextOptions<QuizDbContext> DbOptions { get; }
    public readonly MapperConfiguration MapperConfig;
    
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

        MapperConfig = new ConfigureMapper().Config;
    }

    public void Dispose()
    {
        // ... clean up test data from the database ...
    }
}