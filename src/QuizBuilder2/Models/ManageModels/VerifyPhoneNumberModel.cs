using System.ComponentModel.DataAnnotations;

namespace QuizBuilder2.Models.ManageModels
{
    public class VerifyPhoneNumberModel
    {
        [Required]
        public string Code { get; set; }

        [Required]
        [Phone]
        [Display(Name = "Phone number")]
        public string PhoneNumber { get; set; }
    }
}
