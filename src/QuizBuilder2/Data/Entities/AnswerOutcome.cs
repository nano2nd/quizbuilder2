
namespace QuizBuilder2.Data.Entities
{
    public class AnswerOutcome
    {
        public int AnswerId { get; set; }
        public virtual Answer Answer { get; set; }

        public int OutcomeId { get; set; }
        public virtual Outcome Outcome {get; set;}
    }
}
