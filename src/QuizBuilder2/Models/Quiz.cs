using System.Collections.Generic;

namespace QuizBuilder2.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        public string Title {get; set;}
        public string Summary { get; set; }

        public ICollection<Question> Questions {get; set;}
    }
}
