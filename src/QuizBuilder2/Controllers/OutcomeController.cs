using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizBuilder2.Data;
using QuizBuilder2.Data.Entities;
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
        private readonly IStorageService _storageService;
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        
        public OutcomeController(QuizDbContext db, IOutcomeService outcomeService, 
            IStorageService storageService, IPhotoService photoService, IMapper mapper)
        {
            _db = db;
           _outcomeService = outcomeService;
           _storageService = storageService;
           _photoService = photoService;
            _mapper = mapper;        
        }

        [HttpGet]
        public IEnumerable<CharacterRoleOutcomeModel> DefaultRoleOutcomes()
        {
            return _outcomeService.GetDefaultCharacterRoleOutcomes();
        }

        [HttpGet("{outcomeId}")]
        public async Task<int> PointsPossible(int outcomeId)
        {
            return await _outcomeService.GetPointsPossible(outcomeId);
        }

        [HttpPost]
        public async Task<OutcomeModel> SaveOutcome(OutcomeModel outcomeModel)
        {
            var outcome = await _outcomeService.SaveOutcomeAsync(outcomeModel);
            return _mapper.Map<OutcomeModel>(outcome);
        }

        [HttpPost]
        public async Task<int> RemoveOutcome(int outcomeId)
        {
            return await _outcomeService.RemoveOutcomeAsync(outcomeId);
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

        [HttpPost("{outcomeId}")]
        public async Task<OutcomeModel> UploadPhoto(IFormFile photo, int outcomeId, string source)
        {
            var path = $"outcomes/{outcomeId}/{photo.FileName}";
            var container = "quizbuilder-photos";
            
            var photoPath = await _storageService.UploadFileAsync(photo, container, path);
            
            var newPhoto = new Photo {
                Description = Path.GetFileNameWithoutExtension(photo.FileName),
                Path = path,
                Extension = Path.GetExtension(photo.FileName),
                Source = source
            };
            
            await _photoService.AddPhoto(newPhoto);

            var outcome = await _outcomeService.UpdatePhotoAsync(newPhoto.Id, outcomeId);

            return _mapper.Map<OutcomeModel>(outcome);
        }
    }
}
