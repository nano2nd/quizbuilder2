using System.Collections.Generic;

namespace QuizBuilder2.Data.Entities
{
    public class Outcome
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string ImageFile { get; set; }

        public int QuizId { get; set; }
        public virtual Quiz Quiz { get; set; }

        public ICollection<CharacterRoleOutcome> CharacterRoleOutcomes { get; set; }
        public ICollection<AnswerOutcome> AnswerOutcomes { get; set; }
    }
}
