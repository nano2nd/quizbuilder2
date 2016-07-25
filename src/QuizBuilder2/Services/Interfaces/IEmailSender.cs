using System.Threading.Tasks;

namespace QuizBuilder2.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
