using System.Collections.Generic;

namespace QuizBuilder2.Data.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int Points {get; set; }

        public int QuizId {get; set; }
        public Quiz Quiz { get; set; }

        public ICollection<Answer> Answers {get; set;}
    }
}
