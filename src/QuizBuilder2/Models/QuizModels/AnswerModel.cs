using System.Collections.Generic;

namespace QuizBuilder2.Models
{
    public class AnswerModel {
        public int? Id { get; set; }
        public string Text { get; set; }
        public bool IsImage { get; set; }
        public string ImageFileName { get; set; }
        public int QuestionId { get; set; }

        public ICollection<AnswerOutcomeModel> AnswerOutcomes { get; set; }
    }
}