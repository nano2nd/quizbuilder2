using System.Collections.Generic;

namespace QuizBuilder2.Data.Entities
{
    public class Outcome
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string ImageFile { get; set; }

        public ICollection<Quiz> Quizzes { get; set; }
        public ICollection<CharacterRole> CharacterRoles { get; set; }
        public ICollection<Answer> Answers { get; set; }
    }
}
