using System.Collections.Generic;

namespace QuizBuilder2.Data.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsImage { get; set; }
        public string ImageFile { get; set; }
        
        public int QuestionId { get; set; }
        public Question Question { get; set; }

        public ICollection<Outcome> Outcomes { get; set; }
    }
}
