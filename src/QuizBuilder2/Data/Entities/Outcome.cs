using System.Collections.Generic;
using System.Linq;

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

        public int PointsPossible {
            get {
                if (AnswerOutcomes != null)
                    return AnswerOutcomes.Sum(ao => ao.Answer.Question.Points);

                return 0;
            }
        }

        public CharacterRole TopCharacterRole {
            get {
                if (CharacterRoleOutcomes != null)
                    return CharacterRoleOutcomes.OrderByDescending(cro => cro.Value).FirstOrDefault()?.Role;
                
                return null;
            }
        }
    }
}
