using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace QuizBuilder2.Models
{
    public class CustomJsonResult : JsonResult
    {
        public object data { get; set; }
        public object errors { get; set; }

        public CustomJsonResult(object content, IEnumerable<object> errors) 
            : base(new { content = content, errors = errors}) {}
        public CustomJsonResult(object content)
            : base(new { content = content, errors = new object[0] }) {}

        public static CustomJsonResult Errors(IEnumerable<object> errors)
        {
            return new CustomJsonResult(null, errors);
        }
    }
}
