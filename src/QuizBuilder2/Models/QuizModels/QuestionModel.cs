using System.Collections.Generic;

namespace QuizBuilder2.Models
{
    public class QuestionModel {
        public int Id { get; set; }
        public string Text { get; set; }
        public int Points {get; set; }

        public int QuizId {get; set; }

        public ICollection<AnswerModel> Answers {get; set;}
    }
}