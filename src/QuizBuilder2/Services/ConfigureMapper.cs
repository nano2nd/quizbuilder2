using System.Linq;
using AutoMapper;
using QuizBuilder2.Data.Entities;
using QuizBuilder2.Models;

namespace QuizBuilder2.Services
{
    public class ConfigureMapper
    {
        public ConfigureMapper() {
            _config = new MapperConfiguration(cfg => {
                
                cfg.CreateMap<Answer, AnswerModel>()
                    .ForMember(answerModel => answerModel.Outcomes, opt => opt.ResolveUsing((answer, answerModel, result, mapperContext) => {
                        return answer.AnswerOutcomes.Select(ao => mapperContext.Mapper.Map<Outcome>(ao.Outcome));
                    }));
                
                cfg.CreateMap<ApplicationUser, UserModel>();
                
                cfg.CreateMap<CharacterRole, CharacterRoleModel>();

                cfg.CreateMap<CharacterRoleOutcome, CharacterRoleOutcomeModel>();
                
                cfg.CreateMap<Outcome, OutcomeModel>();
                
                cfg.CreateMap<Question, QuestionModel>();
                
                cfg.CreateMap<Quiz, QuizModel>();
            });
        }

        private MapperConfiguration _config;
        public MapperConfiguration Config {
            get {
                return _config;
            }
        }   
    }
}
