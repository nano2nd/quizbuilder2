using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace QuizBuilder2.Services.Extensions
{
    public static class ExtensionMethods 
    {
        public static IEnumerable<string> GetErrors(this ModelStateDictionary modelState)
        {
            if (modelState.ErrorCount > 0)
                return modelState.SelectMany(m => m.Value.Errors).Select(m => m.ErrorMessage);
            
            return new List<string>();
        }
    }
}
