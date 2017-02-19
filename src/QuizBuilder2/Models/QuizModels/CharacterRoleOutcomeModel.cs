namespace QuizBuilder2.Models
{
    public class CharacterRoleOutcomeModel {
        public int CharacterRoleId { get; set; }
        public int? OutcomeId { get; set; }
        public int Value { get; set; }
        public string CharacterRoleName { get; set; }
        public string CharacterRoleSummary { get; set; }
    }
}