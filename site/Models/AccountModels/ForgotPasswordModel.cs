using System.ComponentModel.DataAnnotations;

namespace QuizBuilder2.Models.AccountModels
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
