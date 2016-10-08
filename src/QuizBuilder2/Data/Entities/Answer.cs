using System.Collections.Generic;
using System.Linq;

namespace QuizBuilder2.Data.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsImage { get; set; }
        public string ImageFile { get; set; }
        
        public int QuestionId { get; set; }
        public virtual Question Question { get; set; }

        public ICollection<AnswerOutcome> AnswerOutcomes { get; set; }
    }
}
