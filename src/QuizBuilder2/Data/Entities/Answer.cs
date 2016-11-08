using System.Collections.Generic;

namespace QuizBuilder2.Data.Entities
{
    public class Answer
    {
        public Answer()
        {
            AnswerOutcomes = new HashSet<AnswerOutcome>();
        }

        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsPhotoOnly { get; set; }
        public int? PhotoId { get; set; }
        
        public int QuestionId { get; set; }
        public virtual Question Question { get; set; }

        public ICollection<AnswerOutcome> AnswerOutcomes { get; set; }

        public Photo Photo { get; set; }
    }
}
