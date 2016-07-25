using System.Threading.Tasks;

namespace QuizBuilder2.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
