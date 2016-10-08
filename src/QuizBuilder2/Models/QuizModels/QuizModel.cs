using System.Collections.Generic;

namespace QuizBuilder2.Models
{
    public class QuizModel
    {
        public int Id { get; set; }
        public string Title {get; set;}
        public string Summary { get; set; }
        
        public ICollection<QuestionModel> Questions { get; set; } 
        public ICollection<OutcomeModel> Outcomes { get; set; }
    }
}
