namespace QuizBuilder2.Models
{
    public class CharacterRoleOutcomeModel {
        public int RoleId { get; set; }
        public int OutcomeId { get; set; }
        public int Value { get; set; }
        public string RoleName { get; set; }
        public string RoleSummary { get; set; }
        public string RoleImageFile { get; set; }
    }
}