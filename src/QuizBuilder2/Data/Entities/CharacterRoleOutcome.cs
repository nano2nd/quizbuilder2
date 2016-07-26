namespace QuizBuilder2.Data.Entities
{
    public class CharacterRoleOutcome
    {
        public int Value { get; set; }
        
        public int CharacterRoleId { get; set; }
        public CharacterRole Role { get; set; }
        
        public int OutcomeId { get; set; }
        public Outcome Outcome { get; set; }
    }
}
