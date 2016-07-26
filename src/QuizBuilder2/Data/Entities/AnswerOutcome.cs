
using System.Collections.Generic;

namespace QuizBuilder2.Data.Entities
{
    public class AnswerOutcome
    {
        public int AnswerId { get; set; }
        public Answer Answer { get; set; }

        public int OutcomeId { get; set; }
        public Outcome Outcome {get; set;}
    }
}
