using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace QuizBuilder2.Models.ManageModels
{
    public class ConfigureTwoFactorModel
    {
        public string SelectedProvider { get; set; }

        public ICollection<SelectListItem> Providers { get; set; }
    }
}
