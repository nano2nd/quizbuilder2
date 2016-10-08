namespace QuizBuilder2.Models
{
    public class AnswerModel {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsImage { get; set; }
        public string ImageFile { get; set; }
        
        public int QuestionId { get; set; }
        public int QuestionPoints { get; set; }
    }
}