using Microsoft.Extensions.DependencyInjection;
using QuizBuilder2.Data.Seeding;

namespace QuizBuilder2.Services
{
    public static class ConfigureQuizBuilder 
    {
        public static IServiceCollection AddQuizBuilderServices(this IServiceCollection serviceCollection)
        {
            return serviceCollection
                .AddTransient<ISeeder, DefaultSeeder>()
                
                .AddTransient<IEmailSender, AuthMessageSender>()
                .AddTransient<ISmsSender, AuthMessageSender>()
                
                .AddTransient<IQuizService, QuizService>();
        }
    }
}
