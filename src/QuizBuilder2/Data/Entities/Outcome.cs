using System.Collections.Generic;
using System.Linq;

namespace QuizBuilder2.Data.Entities
{
    public class Outcome
    {
        public Outcome()
        {
            CharacterRoleOutcomes = new HashSet<CharacterRoleOutcome>();
            AnswerOutcomes = new HashSet<AnswerOutcome>();
        }
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public int? PhotoId { get; set; }

        public int QuizId { get; set; }
        public virtual Quiz Quiz { get; set; }

        public ICollection<CharacterRoleOutcome> CharacterRoleOutcomes { get; set; }
        public ICollection<AnswerOutcome> AnswerOutcomes { get; set; }

        public Photo Photo { get; set; }

        public int PointsPossible {
            get {
                if (AnswerOutcomes != null)
                {
                    var questionSeen = new List<int>();
                    var runningSum = 0;
                    foreach(var ao in AnswerOutcomes)
                    {
                        if (questionSeen.Contains(ao.Answer.QuestionId))
                            continue;
                        runningSum += ao.Answer.Question.Points;
                        questionSeen.Add(ao.Answer.QuestionId);
                    }
                    return runningSum;
                }

                return 0;
            }
        }

        public CharacterRole TopCharacterRole {
            get {
                if (CharacterRoleOutcomes != null)
                    return CharacterRoleOutcomes.OrderByDescending(cro => cro.Value).FirstOrDefault()?.CharacterRole;
                
                return null;
            }
        }
    }
}
