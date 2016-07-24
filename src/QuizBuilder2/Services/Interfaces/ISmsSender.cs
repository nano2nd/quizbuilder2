using System.Threading.Tasks;

namespace QuizBuilder2.Services.Interfaces
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
