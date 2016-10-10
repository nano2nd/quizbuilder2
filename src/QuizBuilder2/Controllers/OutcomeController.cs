using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizBuilder2.Data;
using QuizBuilder2.Models;
using QuizBuilder2.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuizBuilder2.Controllers
{
    [Authorize(Roles = "QuizAdminRole")]
    [Route("api/[controller]/[action]")]
    public class OutcomeController : Controller
    {
        private readonly QuizDbContext _db;
        private readonly IOutcomeService _outcomeService;
        private readonly IMapper _mapper;
        
        public OutcomeController(QuizDbContext db, IOutcomeService outcomeService, IMapper mapper)
        {
            _db = db;
           _outcomeService = outcomeService;
            _mapper = mapper;        
        }

        [HttpPost]
        public async Task<OutcomeModel> SaveOutcome(OutcomeModel answerModel)
        {
            return null;
        }

        [HttpPost]
        public async Task<int> RemoveOutcome(int outcomeId)
        {
            return 0;
        }

        [HttpPost]
        public async Task<int> LinkOutcomeToAnswer(int answerId, int outcomeId)
        {
            return await _outcomeService.LinkOutcomeToAnswerAsync(answerId, outcomeId);
        }

        [HttpPost]
        public async Task<int> UnlinkOutcomeFromAnswer(int answerId, int outcomeId)
        {
            return await _outcomeService.UnlinkOutcomeFromAnswerAsync(answerId, outcomeId);
        }
    }
}
