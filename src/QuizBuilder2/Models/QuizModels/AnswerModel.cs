using System.Collections.Generic;

namespace QuizBuilder2.Models
{
    public class AnswerModel {
        public int? Id { get; set; }
        public string Text { get; set; }
        public bool IsPhotoOnly { get; set; }
        public int QuestionId { get; set; }
        public int? PhotoId { get; set; }

        public string PhotoPath { get; set; }
        public string PhotoSource { get; set; }

        public ICollection<AnswerOutcomeModel> AnswerOutcomes { get; set; }
    }
}