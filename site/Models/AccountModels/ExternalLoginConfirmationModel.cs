using System.ComponentModel.DataAnnotations;

namespace QuizBuilder2.Models.AccountModels
{
    public class ExternalLoginConfirmationModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
