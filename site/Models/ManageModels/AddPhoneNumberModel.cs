using System.ComponentModel.DataAnnotations;

namespace QuizBuilder2.Models.ManageModels
{
    public class AddPhoneNumberModel
    {
        [Required]
        [Phone]
        [Display(Name = "Phone number")]
        public string PhoneNumber { get; set; }
    }
}
