namespace QuizBuilder2.Data.Entities
{
    public class CharacterRoleOutcome
    {
        public int Value { get; set; }
        
        public int CharacterRoleId { get; set; }
        public virtual CharacterRole CharacterRole { get; set; }
        
        public int OutcomeId { get; set; }
        public virtual Outcome Outcome { get; set; }
    }
}
