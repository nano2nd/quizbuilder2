using System.Collections.Generic;
using System.Linq;

namespace QuizBuilder2.Models
{
    public class OutcomeModel {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string ImageFile { get; set; }

        public int QuizId { get; set; }

        public int PointsPossible { get; set; }

        public CharacterRoleModel TopCharacterRole { get; set; }
    }
}