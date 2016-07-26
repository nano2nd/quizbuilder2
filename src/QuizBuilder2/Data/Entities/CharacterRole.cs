using System.Collections.Generic;

namespace QuizBuilder2.Data.Entities
{
    public class CharacterRole
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string ImageFile { get; set; }

        public ICollection<Outcome> Outcomes {get; set;}
    }
}
